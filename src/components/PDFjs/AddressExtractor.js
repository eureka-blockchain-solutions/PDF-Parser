import React, { Component } from "react";
import styled from "styled-components";
import stringTokenizer from "string-punctuation-tokenizer";
import { __ALERT_ERROR } from "../../helpers/colors";

const Container = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${__ALERT_ERROR};
`;

const Text = styled.div``;

class AddressExtractor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  /**
   * Function that checks whether there are EKA addresses in the PAGE (using checksum and decoding function )
   */
  areThereEKAAddresses() {}

  /**
   * Extract EKAAddresses
   */
  extractEKAAddresses() {}

  /*Automation extraction from PDF for author names always need a manual check from the user*/
  tryToFindAuthorNames() {}

  makeSuggestionsForAuthorNames() {}

  render() {
    return (
      <Container>
        <Title>Evaluating Page Number {this.props.pageNr}</Title>
        <Text>render something smart</Text>
      </Container>
    );
  }
}

export default AddressExtractor;
