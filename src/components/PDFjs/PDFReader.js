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
    this.state = { pdf: null };
  }

  async componentDidMount() {
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    /*    const url =
          "https://s3.amazonaws.com/sosjournals/0DelhOhVxcKXaqJXSelf-Contained_Proofs-IEEE-eka.pdf";*/

    const url =
      "https://s3.amazonaws.com/sosjournals/0DelhOhVxcKXaqJXSelf-Contained_Proofs-IEEE-eka.pdf"; // this.props.pdfs[0];

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
            <Summary />
            <Viewer pdf={this.state.pdf} />
          </SubContainer>
        ) : null}
      </Container>
    );
  }
}

export default PDFReader;
