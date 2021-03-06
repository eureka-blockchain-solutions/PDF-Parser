import React, { Component } from "react";
import styled from "styled-components";
import * as PdfJs from "pdfjs-dist";
import { WORKER_URL } from "./WorkerLink";
import { Promise as resolve } from "q";
import { __GRAY_200 } from "../../helpers/colors";
import PDF from "./PDF";
import { Viewer } from "./Viewer";
import AddressExtractor from "./AddressExtractor";
import Summary from "./Summary";

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  border-right: 1px solid ${__GRAY_200};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class PDFReader extends Component {
  constructor() {
    super();
    this.state = {
      pdf: null,
      entities: null,
      references: null,
      addresses: []
    };
  }

  async componentDidMount() {
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    /*    const url =
          "";*/

    const url = this.props.pdfs[0];

    // The workerSrc property shall be specified.
    PdfJs.GlobalWorkerOptions.workerSrc = WORKER_URL;
    // Asynchronous download of PDF
    const loadingTask = PdfJs.getDocument(url);

    const that = this;
    loadingTask.promise.then(pdf => {
      that.setState({ pdf });
    });
  }

  render() {
    return (
      <Container>
        {this.state.pdf ? (
          <SubContainer>
            {this.state.entities && this.state.references ? (
              <Summary
                entities={this.state.entities}
                references={this.state.references}
                addresses={this.state.addresses}
              />
            ) : null}
            <Viewer
              entities={this.state.entities}
              pdf={this.state.pdf}
              setReferences={references => {
                this.setState({ references });
              }}
              setEntities={entities => {
                this.setState({ entities });
              }}
              setAddresses={addresses => {
              }}
            />
          </SubContainer>
        ) : null}
      </Container>
    );
  }
}

export default PDFReader;
