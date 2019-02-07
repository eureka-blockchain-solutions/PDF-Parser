import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import NamedEntities from "./NamedEntities";
import nlp from "compromise";
import { InitialPrefix } from "../../constants/Prefix";
import { NUMBER_OF_EKA_CHARACTERS } from "../../helpers/ChecksumParameters";
import { isCheckSum } from "../../helpers/base58";

const Container = styled.div`
  flex: 1;
  padding: 0 2rem;
`;

const Title = styled.h3`
  color: ${__ALERT_ERROR};
`;

const Text = styled.div``;

class AddressExtractor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const page = this.props.page;

    const normalized = page.map(sentence => {
      return this.normalizeSentences(sentence);
    });

    console.log(normalized);
  }

  normalizeSentences(sentence) {
    // EKA ADDRESSES DONT HAVE TO BE NORMALIZED!
    if (!this.isEKA(sentence)) {
      return nlp(sentence)
        .normalize()
        .out();
    }

    return sentence;
  }
  /**
   * Function that checks whether there are EKA addresses in the PAGE (using checksum and decoding function )
   */
  isEKA(sentence) {
    return this.getEKA(sentence);
  }

  /**
   * Function that returns a EKA address (if any). null otherwise
   * @param string
   */
  getEKA(string) {
    if (string.toString().includes(InitialPrefix)) {
      const split = string.toString().split(InitialPrefix);
      const EKAish = split[split.length - 1];
      const EKA = EKAish.substr(0, NUMBER_OF_EKA_CHARACTERS);
      if (isCheckSum(EKA)) {
        return EKA;
      }
    }
    return null;
  }

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
        <NamedEntities>oasfjoajofs</NamedEntities>
      </Container>
    );
  }
}

export default AddressExtractor;
