import React, { Component } from "react";
import styled from "styled-components";

// Components
import { Page } from "./Page";
import AddressExtractor from "./AddressExtractor";
import * as PropTypes from "prop-types";

const ViewContainer = styled.div``;

const PageContainer = styled.div`
  display: flex;
`;

class Viewer extends Component {
  constructor() {
    super();
    this.state = { pages: null };
  }

  async componentDidMount() {
    let { pdf } = this.props;


    const TOTAL_PAGES = pdf ? pdf._pdfInfo.numPages : 0;

    const pagesPromises = [];

    for (let p = 1; p <= TOTAL_PAGES; p++) {
      pagesPromises.push(this.getPageText(p, pdf));
    }

    const pages = await Promise.all(pagesPromises).then(pagesText => {
      // Display text of all the pages in the console
      return pagesText;
    });

    this.setState({ pages });
  }
  /**
   * Retrieves the text of a specif page within a PDF Document obtained through pdf.js
   *
   * @param {Integer} pageNum Specifies the number of the page
   * @param {PDFDocument} PDFDocumentInstance The PDF document obtained
   * https://mozilla.github.io/pdf.js/api/draft/global.html#getTextContentParameters
   **/
  getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function(resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
        console.log(pdfPage);
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage
          .getTextContent({
            normalizeWhitespace: true,
            disableCombineTextItems: true
          })
          .then(function(textContent) {
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
    let { pdf, ...props } = this.props;

    if (pdf && this.state.pages) {
      return (
        <ViewContainer>
          {this.state.pages.map((text, i) => {
            return (
              <PageContainer key={`document-page-${i}`}>
                <Page pdf={pdf} index={i + 1} {...props} />
                <AddressExtractor pageNr={i + 1} text={text} />
              </PageContainer>
            );
          })}
        </ViewContainer>
      );
    }
    return null;
  }
}

Viewer.propTypes = { pdf: PropTypes.any };

export { Viewer };
