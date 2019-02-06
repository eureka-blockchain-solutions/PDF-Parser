import React, { Component } from "react";
import styled from "styled-components";
import * as PdfJs from "pdfjs-dist";
import { WORKER_URL } from "./WorkerLink";
import { Promise as resolve } from "q";
import { __GRAY_200 } from "../../helpers/colors";
import PDF from "./PDF";
import { Viewer } from "./Viewer";

const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  border: 1px solid ${__GRAY_200};
`;

const SubContainer = styled.div`
  display: flex;
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

    const url = this.props.pdfs[0];

    // The workerSrc property shall be specified.
    PdfJs.GlobalWorkerOptions.workerSrc = WORKER_URL;
    // Asynchronous download of PDF
    const loadingTask = PdfJs.getDocument(url);

    const that = this;
    loadingTask.promise.then(pdf => {
      that.setState({ pdf });
      const TOTAL_PAGES = pdf._pdfInfo.numPages;
      const pagesPromises = [];

      for (let p = 1; p <= TOTAL_PAGES; p++) {
        pagesPromises.push(this.getPageText(p, pdf));
      }

      Promise.all(pagesPromises).then(pagesText => {
        // Display text of all the pages in the console
        console.log(pagesText);
      });
    });
  }

  /**
   * Retrieves the text of a specif page within a PDF Document obtained through pdf.js
   *
   * @param {Integer} pageNum Specifies the number of the page
   * @param {PDFDocument} PDFDocumentInstance The PDF document obtained
   **/
  getPageText(pageNum, PDFDocumentInstance) {
    const that = this;
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function(resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then(function(textContent) {
          const textItems = textContent.items;
          let finalString = "";

          // Concatenate the string of the item to the final string
          for (let i = 0; i < textItems.length; i++) {
            const item = textItems[i];
            finalString += item.str + " ";
          }

          // Solve promise with the text retrieven from the page
          resolve(finalString);
        });
      });
    });
  }

  render() {
    return (
      <Container>
        {this.state.pdf ? (
          <SubContainer>
            <Viewer pdf={this.state.pdf} />

          </SubContainer>
        ) : null}
      </Container>
    );
  }
}

export default PDFReader;
