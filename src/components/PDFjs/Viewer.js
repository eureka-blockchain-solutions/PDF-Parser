import React, { Component } from "react";
import styled from "styled-components";

// Components
import { Page } from "./Page";
import AddressExtractor from "./AddressExtractor";
import * as PropTypes from "prop-types";
import * as PdfJs from "pdfjs-dist";
import EurekaRotateSpinner from "../../views/spinners/EurekaRotateSpinner";
import EurekaSpinner from "../../views/spinners/EurekaSpinner";

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
      pagesPromises.push(this.getTextContent(p, pdf));
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
  getTextContent(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    const that = this;
    return new Promise(function(resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage
          .getTextContent({
            normalizeWhitespace: true,
            disableCombineTextItems: true
          })
          .then(textContent => {
            const textItems = textContent.items;
            const map = that.getMap(textItems);
            const text = that.getText(textItems);
            resolve(text);
          });
      });
    });
  }

  getText(textItems) {
    let sentences = [];
    for (let i = 0; i < textItems.length; i++) {
      const item = textItems[i];
      const text = item.str;
      sentences.push(text);
    }
    return sentences;
  }

  getMap(textItems) {
    let sentenceMap = new Map();
    for (let i = 0; i < textItems.length; i++) {
      let item = textItems[i];

      const tx = item.transform;
      const fontSize = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);

      let entrySentences = sentenceMap.get(fontSize)
        ? sentenceMap.get(fontSize)
        : [];
      if (fontSize) {
        entrySentences.push(item);
        sentenceMap.set(fontSize, entrySentences);
      }
    }
    return sentenceMap;
  }

  render() {
    let { pdf, ...props } = this.props;

    if (pdf && this.state.pages) {
      return (
        <ViewContainer>
          {this.state.pages.map((page, i) => {
            return (
              <PageContainer key={`document-page-${i}`}>
                <Page pdf={pdf} index={i + 1} {...props} />
                <AddressExtractor pageNr={i + 1} page={page} />
              </PageContainer>
            );
          })}
        </ViewContainer>
      );
    }
    return <EurekaRotateSpinner width={150} height={150} />;
  }
}

Viewer.propTypes = { pdf: PropTypes.any };

export { Viewer };
