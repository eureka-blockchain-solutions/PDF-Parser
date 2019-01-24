import React, { Component } from "react";
import styled from "styled-components";
import * as PdfJs from "pdfjs-dist";
import { WORKER_URL } from "./WorkerLink";

const Container = styled.div``;

class PDFReader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    const url = "dataset/paper1.pdf";

    // The workerSrc property shall be specified.
    PdfJs.GlobalWorkerOptions.workerSrc = WORKER_URL;
    // Asynchronous download of PDF
    const loadingTask = PdfJs.getDocument(url);

    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        page.getTextContent().then(function(textContent) {
          const textItems = textContent.items;
          let finalString = "";

          // Concatenate the string of the item to the final string
          for (let i = 0; i < textItems.length; i++) {
            const item = textItems[i];
            finalString += item.str + " ";
          }

          console.log(finalString);
        });
      });
    });
  }

  render() {
    return <Container>PDFReader Component</Container>;
  }
}

export default PDFReader;
