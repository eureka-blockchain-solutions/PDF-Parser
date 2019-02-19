import React, { Component } from "react";
import styled from "styled-components";

// Components
import { Page } from "./Page";
import AddressExtractor from "./AddressExtractor";
import EurekaRotateSpinner from "../../views/spinners/EurekaRotateSpinner";
import { REF_STOP_WORDS } from "../../constants/ReferencesStopWords";

const ViewContainer = styled.div``;

const PageContainer = styled.div`
  display: flex;
`;

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      pages: null,
      sentenceMap: null,
      refStartPointHasBeenFound: false
    };
  }

  async componentDidMount() {
    let { pdf } = this.props;

    const TOTAL_PAGES = pdf ? pdf._pdfInfo.numPages : 0;

    let pages = [];

    for (let p = 1; p <= TOTAL_PAGES; p++) {
      let page = await this.getTextContent(p, pdf);
      pages.push(page);
    }

    this.setState({
      pages: pages.map(page => {
        return page.text;
      }),
      sentenceMap: pages.map(page => {
        return page.sentenceMap;
      })
    });
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
    return new Promise((resolve, reject) => {
      PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage
          .getTextContent({
            normalizeWhitespace: true,
            disableCombineTextItems: true
          })
          .then(textContent => {
            const textItems = textContent.items;
            const sentenceMap = that.getMap(textItems);
            const text = that.getText(textItems);
            const references = that.getReferences(textItems, pageNum);

            let obj = { sentenceMap, text, pageNum };
            resolve(obj);
          });
      });
    });
  }

  getReferences(textItems, pageNum) {
    console.log("Evaluating page nunber ", pageNum);
    for (let i = 0; i < textItems.length; i++) {
      const line = textItems[i].str;
      // refs found in the line

      if (
        REF_STOP_WORDS.includes(line.toLowerCase()) ||
        REF_STOP_WORDS.includes(line.toUpperCase())
      ) {
        this.setState({ refStartPointHasBeenFound: true });
      }
      // TODO: consider these cases as well [1] or [1,3] or [8-10]
      let refNumber = this.extractReferenceNumber(line);
      if (
        refNumber &&
        refNumber.length > 0 &&
        this.state.refStartPointHasBeenFound
      ) {
        let refNumberString = refNumber[0];
        let reference = line;
        reference = reference.replace(refNumberString, ""); // remove ref number from string
        // continue until the next reference has been found in the text
        while (!this.extractReferenceNumber(textItems[++i].str)) {
          reference += textItems[i].str + " ";
          if (i + 1 === textItems.length) {
            break;
          }
        }
        i--;
        console.log(refNumberString + "___" + reference);
      }
    }
  }

  extractReferenceNumber(text) {
    let match = text.toString().match(/\[([0-9]+)]/g);
    if (match) {
      return match.map(m => m.trim());
    }
    return null;
  }

  getText(textItems) {
    let sentences = [];
    for (let i = 0; i < textItems.length; i++) {
      const item = textItems[i];
      sentences.push(item);
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
    if (pdf && this.state.pages && this.state.sentenceMap) {
      return (
        <ViewContainer>
          {this.state.pages.map((page, i) => {
            return (
              <PageContainer key={`document-page-${i}`}>
                <Page pdf={pdf} index={i + 1} {...props} />
                <AddressExtractor
                  pageNr={i + 1}
                  page={page}
                  sentenceMap={this.state.sentenceMap}
                  entities={this.props.entities}
                  setEntities={entities => {
                    this.props.setEntities(entities);
                  }}
                />
              </PageContainer>
            );
          })}
        </ViewContainer>
      );
    }
    return <EurekaRotateSpinner width={150} height={150} />;
  }
}

export { Viewer };
