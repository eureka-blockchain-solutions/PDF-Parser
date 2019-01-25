import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { __FIFTH, __GRAY_300, __GRAY_500 } from "../../helpers/colors.js";
import Icon from "../../views/icons/Icon.js";
import S3Upload from "../S3Upload";
import randomstring from "randomstring";
import { getDomain } from "../../helpers/getDomain";
import BarLoader from "../BarLoader";

const DropZoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 200px;
  width: 60%;
  margin: 2em 0;
  flex-direction: column;
`;

const StyledDropzone = styled(Dropzone)`
  width: 100%;
`;

const DropperContent = styled.div`
  color: ${__GRAY_300};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 0.2s ease-in-out;
`;

const Dropper = styled.div`
  &:hover {
    border: 2px dashed ${__GRAY_500};
    & ${DropperContent} {
      color: ${__GRAY_500};
      & > svg {
        fill: ${__GRAY_500};
      }
    }
  }

  & {
    ${props =>
      props.isDragActive
        ? `
          border: 2px dashed ${__FIFTH};
           & ${DropperContent} {
              color: ${__FIFTH};   
               & > svg {
                  fill: ${__FIFTH};
               }
           }
          `
        : null}
  }

  border: 2px dashed ${__GRAY_300};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 20px;
  min-height: 150px;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const DropperTitle = styled.h2`
  margin-top: 4px;
`;

const VerticalContainer = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
`;

class PDFDropzone extends React.Component {
  constructor() {
    super();
    this.state = {
      uploading: []
    };
  }

  onDrop(accepted_files) {
    const new_files = [];
    accepted_files.forEach(file => {
      const { name, type } = file;
      const id = randomstring.generate(8);
      const s3upload = new S3Upload({
        s3_sign_put_url: `${getDomain()}/fileupload`,
        onProgress: percent => {
          this.setState({
            uploading: this.state.uploading.map(u => {
              if (u.id === id) {
                return {
                  id,
                  progress: percent
                };
              }
              return u;
            })
          });
        },
        onFinishS3Put: public_url => {
          /*    this.props.onChangeFigure({
            contents: [
              {
                url: public_url,
                name,
                type,
                id: "f-" + Math.floor(Math.random() * 100000000)
              }
            ]
          });*/
          this.setState({
            uploading: this.state.uploading.filter(u => u.id !== id)
          });
        },
        onError: err => {
          alert("Could not upload: " + err);
        }
      });
      new_files.push({
        id,
        progress: 0
      });
      s3upload.uploadFile(file);
    });
    this.setState({
      uploading: [...this.state.uploading, ...new_files]
    });
  }

  render() {
    console.log(this.state.uploading);
    return (
      <DropZoneContainer>
        <StyledDropzone onDrop={this.onDrop.bind(this)}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} style={{ width: "100%" }}>
                <input {...getInputProps()} />
                <Dropper isDragActive={isDragActive}>
                  <DropperContent>
                    <Icon
                      noMove
                      icon={"uploadPDF"}
                      width={75}
                      height={75}
                      color={__GRAY_300}
                    />
                    <DropperTitle>Upload your PDF here</DropperTitle>
                  </DropperContent>
                </Dropper>
              </div>
            );
          }}
        </StyledDropzone>
        {this.state.uploading.map(u => {
          return (
            <VerticalContainer key={u.id}>
              <BarLoader progress={u.progress} />
            </VerticalContainer>
          );
        })}
      </DropZoneContainer>
    );
  }
}

export default PDFDropzone;
