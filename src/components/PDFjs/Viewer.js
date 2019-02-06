import React from "react";
import styled from "styled-components";

// Components
import { Page } from "./Page";
import AddressExtractor from "./AddressExtractor";

const ViewContainer = styled.div``;

const PageContainer = styled.div`
  display: flex;
`;

/**
 * View.js
 * Component that works as a pdf pages "container"
 * - default usage is in ../PDFViewer.js
 **/
const Viewer = ({ pdf, ...props }) => {
  const numPages = pdf ? pdf._pdfInfo.numPages : 0;

  if (pdf) {
    return (
      <ViewContainer>
        {Array.apply(null, { length: numPages }).map((v, i) => (
          <PageContainer>
            <Page
              pdf={pdf}
              index={i + 1}
              key={`document-page-${i}`}
              {...props}
            />
            <AddressExtractor />
          </PageContainer>
        ))}
      </ViewContainer>
    );
  }

  return null;
};

export { Viewer };
