import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import NamedEntities from "./NamedEntities";
import nlp from "compromise";
import { InitialPrefix } from "../../constants/Prefix";
import { NUMBER_OF_EKA_CHARACTERS } from "../../helpers/ChecksumParameters";
import { isCheckSum } from "../../helpers/base58";
import { ALL_NAMES } from "../../data/AllNames";
import _ from "lodash";
import { EXTRACT_ENTITIES } from "./EXTRACT_ENTITY_FACTORY";

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
      const entities = _.flattenDeep(this.findAllEntities());
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
      let entity = EXTRACT_ENTITIES(text);
      if (entity.length > 0) {
        entities.push(entity);
      }
    });
    return entities;
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
