import React, { Component } from "react";
import styled from "styled-components";
import stringTokenizer from "string-punctuation-tokenizer";

const Container = styled.div`
  flex: 1;
`;

const Text = styled.div``;

class AddressExtractor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

  }



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
        AddressExtractor Component {this.props.pageNr}
        <Text>render something smart</Text>
      </Container>
    );
  }
}

export default AddressExtractor;
