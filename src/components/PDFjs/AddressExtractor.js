import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import NamedEntities from "./NamedEntities";
import nlp from "compromise";
import { InitialPrefix } from "../../constants/Prefix";
import { NUMBER_OF_EKA_CHARACTERS } from "../../helpers/ChecksumParameters";
import { isCheckSum } from "../../helpers/base58";
import PulseSpinner from "../../views/spinners/PulseSpinner";
import { STOP_WORDS } from "../../data/StopWords";
import { ALL_NAMES } from "../../data/AllNames";

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
    this.state = { entities: null };
  }

  componentDidMount() {
    const page = this.props.page;
    let entities = [];
    page.map(sentence => {
      sentence.split("and ").map(s => {
        s.split(",").map(r => {
          // check if there is a string that sounds like a name
          // const i = ALL_NAMES.findIndex(v => v.includes());

          let entity = this.extractEntities(r);
          if (entity) {
            entities.push(entity);
          } else {
            let guessedEntities = [];

            // TODO: suggest strings that starts with common english first names
            const splitWhiteSpace = r.trim().split(" ");
            const NUMBER_OF_WORDS_FOR_NAME = 3;
            ALL_NAMES.forEach(name => {
              if (
                splitWhiteSpace.includes(name) &&
                splitWhiteSpace.length <= NUMBER_OF_WORDS_FOR_NAME
              ) {
                entities.push([
                  {
                    firstName: null,
                    lastName: null,
                    text: r
                  }
                ]);
              }
            });
          }
        });
      });
    });
    if (entities.length > 0) {
      this.setState({ entities });
    }
  }

  removeCommas(sentence) {}

  removeWellKnownEnglishWords(sentence) {}

  normalizeSentence(sentence) {
    // EKA ADDRESSES DONT HAVE TO BE NORMALIZED!
    if (!this.isEKA(sentence)) {
      return nlp(sentence)
        .normalize()
        .out();
    }

    return sentence;
  }

  // Named-entities: - get the people, places, organizations:
  extractEntities(sentence) {
    const entities = nlp(sentence)
      .people()
      .data();

    if (entities.length > 0) return entities;
    return null;
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
        {this.state.entities ? (
          <NamedEntities entities={this.state.entities} />
        ) : null}
      </Container>
    );
  }
}

export default AddressExtractor;
