import React, { Component } from "react";
import styled from "styled-components";
import * as PdfJs from "pdfjs-dist";
import { WORKER_URL } from "./WorkerLink";
import { Promise as resolve } from "q";
import { __GRAY_200 } from "../../helpers/colors";
import PDF from "./PDF";
import { Viewer } from "./Viewer";

const Container = styled.div`
  flex: 1;
  border: 1px solid ${__GRAY_200};
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
        const scale = 1.5;
        const viewport = pdfPage.getViewport({ scale: scale });
        const index = pdfPage.pageIndex;

        // Prepare canvas using PDF page dimensions
        /*  console.log(pdfPage);
        if (index === 0) {
          const ref = that.refs["firstPage"];
          const canvas = ref;
          const context = canvas.getContext("2d");
          canvas.height = 800;
          canvas.width = 600;

          // Render PDF page into canvas context
          const renderContext = { canvasContext: context, viewport: viewport };
          const renderTask = pdfPage.render(renderContext);
          renderTask.promise.then(function() {
            console.log("Page rendered");
          });
        }*/

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
    console.log(this.state.pdf);
    return (
      <Container>
        {/*<canvas ref="firstPage" />*/}
        {this.state.pdf ? <Viewer pdf={this.state.pdf} /> : null}
      </Container>
    );
  }
}

export default PDFReader;
