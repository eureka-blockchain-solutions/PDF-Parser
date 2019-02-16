import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import NamedEntities from "./NamedEntities";
import nlp from "compromise";
import { InitialPrefix } from "../../constants/Prefix";
import { NUMBER_OF_EKA_CHARACTERS } from "../../helpers/ChecksumParameters";
import { isCheckSum } from "../../helpers/base58";
import { ALL_NAMES } from "../../data/AllNames";
import { TWENTY_K_ENGLISH_WORDS } from "../../data/EnglishWords";

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
  }

  componentDidMount() {
    // consider just the first page for main authors
    if (this.props.pageNr === 1) {
      const entities = this.findAllEntities();
      if (entities.length > 0) {
        this.props.setEntities(entities);
      }
    }
  }

  findAllEntities() {
    const page = this.props.page;

    let entities = [];
    page.map(sentence => {
      let text = sentence.str;
      text
        .split(/,|and /g)
        .map(s => s.toString().trim())
        .map(token => {
          let entity = this.extractEntities(token);
          if (entity) {
            if (entity[0].firstName && entity[0].lastName) {
              entities.push(entity);
            }
          } else {
            const array = token.split(" ");

            // array has at least 2 entries, first letters of each entry are capitalized, ALL_NAMES includes the given token
            if (this.areGeneralNameRequirementsSatisfied(array)) {
              array.forEach(name => {
                if (this.areSpecificNameRequirementsSatisfied(name)) {
                  // join rest of the array starting from position 1
                  const lastName = array.splice(1).join(" ");
                  entities.push([
                    {
                      firstName: array[0],
                      lastName,
                      text: token
                    }
                  ]);
                }
              });
            }
          }
        });
    });
    return entities;
  }

  areGeneralNameRequirementsSatisfied(array) {
    const MAX_NUMBER_OF_WORDS_FOR_NAME = 3;
    return (
      this.areFirstLettersCapitalized(array) &&
      array.length > 1 &&
      array.length <= MAX_NUMBER_OF_WORDS_FOR_NAME
    );
  }

  //TODO: search for common english words and excludes these names that are in that list

  areSpecificNameRequirementsSatisfied(name) {
    return (
      (ALL_NAMES.includes(name.substr(0, name.length - 3)) ||
        ALL_NAMES.includes(name.substr(0, name.length - 2)) ||
        ALL_NAMES.includes(name.substr(0, name.length - 1)) ||
        ALL_NAMES.includes(name)) &&
      !TWENTY_K_ENGLISH_WORDS.includes(name.toLowerCase()) &&
      this.areAllLetters(name)
    );
  }

  areAllLetters(name) {
    const letters = /^[A-Za-z]+$/;
    return name.match(letters);
  }

  areFirstLettersCapitalized(array) {
    let flag = true;
    for (let i = 0; i < array.length; i++) {
      if (!this.isFirstLetterCapitalized(array[i], i)) {
        flag = false;
      }
    }
    return flag;
  }

  isFirstLetterCapitalized(word) {
    return /[A-Z]/.test(word);
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

  render() {
    return (
      <Container>
        <Title>Evaluating Page Number {this.props.pageNr}</Title>
        {this.props.entities ? (
          <NamedEntities entities={this.props.entities} />
        ) : null}
      </Container>
    );
  }
}

export default AddressExtractor;
