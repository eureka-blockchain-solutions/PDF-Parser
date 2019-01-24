import React, { Component } from "react";
import styled from "styled-components";
import * as PdfJs from "pdfjs-dist";
import { WORKER_URL } from "./WorkerLink";
import { Promise as resolve } from "q";

const Container = styled.div``;

class PDFReader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    const url = "dataset/paper1.pdf";

    // The workerSrc property shall be specified.
    PdfJs.GlobalWorkerOptions.workerSrc = WORKER_URL;
    // Asynchronous download of PDF
    const loadingTask = PdfJs.getDocument(url);

    loadingTask.promise.then(pdf => {
      let pdfFullText = "";
      const TOTAL_PAGES = pdf._pdfInfo.numPages;
      const pagesPromises = [];

      for (let p = 1; p <= TOTAL_PAGES; p++) {
        pagesPromises.push(this.getPageText(p, pdf));
      }

      Promise.all(pagesPromises).then(function(pagesText) {
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
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function(resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(function(pdfPage) {
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
    return <Container>PDFReader Component</Container>;
  }
}

export default PDFReader;
