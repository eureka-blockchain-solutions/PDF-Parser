import React, { Component } from "react";
import styled from "styled-components";
import {
  __ALERT_ERROR,
  __ALERT_WARNING,
  __GRAY_900
} from "../../helpers/colors";
import Guess from "./Guess";
import Confirmed from "./Confirmed";
import * as PropTypes from "prop-types";
import uuidv1 from "uuid";
import queryString from "querystring";
import { getDomain } from "../../helpers/getDomain";
import References from "./References";
import ConfirmedReferences from "./ConfirmedReferences";
import { EXTRACT_ENTITIES } from "./EXTRACT_ENTITY_FACTORY";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${__ALERT_ERROR};
  text-transform: uppercase;
`;

const Addresses = styled.div`
  display: flex;
  flex-direction: column;
`;

const STitle = styled.h3`
  color: ${__GRAY_900};
`;

const Body = styled.div`
  display: flex;
`;

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      guessedFields: [],
      confirmedFields: [],
      guessedReferences: [],
      confirmedReferences: []
    };
  }

  componentDidMount() {
    this.initGuessedFields();
    this.initGuessedReferences();
  }

  initGuessedFields() {
    let guessedFields = [...this.state.guessedFields];
    let { entities } = this.props;
    entities.map(entity => {
      const fName = entity.firstName;
      const lName = entity.lastName;
      const fNameValue = fName
        ? fName.charAt(0).toUpperCase() + fName.slice(1)
        : "";
      const lNameValue = lName
        ? lName.charAt(0).toUpperCase() + lName.slice(1)
        : "";
      let field = { fName: fNameValue, lName: lNameValue, id: uuidv1() };
      guessedFields.push(field);
    });
    this.setState({ guessedFields });
  }

  initGuessedReferences() {
    let { references } = this.props;
    references.map(ref => {
      let entities = EXTRACT_ENTITIES(ref.reference);
      ref.entities = [];
      entities.map(entity => {
        ref.entities.push({
          fName: entity.firstName,
          lName: entity.lastName,
          id: uuidv1()
        });
      });
    });
    this.setState({ guessedReferences: references });
  }

  updateFields(listName, list, key, id, value) {
    const field = _.flattenDeep(list).find(f => f.id === id);
    field[key] = value;
    this.setState({ [listName]: list });
  }

  addField(key, list, obj) {
    list.push(obj);
    this.setState({ [key]: list });
  }

  removeField(key, list, id) {
    this.setState({
      [key]: _.flattenDeep(list).filter(f => f.id !== id)
    });
  }

  removeReference(refNumber, id) {
    let refs = [...this.state.guessedReferences];
    const ref = refs.find(r => r.number === refNumber);
    const newEntities = ref.entities.filter(e => e.id !== id);
    ref.entities = newEntities;
    this.setState({ guessedReferences: refs });
  }

  addReference(refNumber, obj) {
    let refs = [...this.state.guessedReferences];
    let list = refs.find(r => r.number === refNumber).entities;
    list.push(obj);
    refs.entities = list;
    this.setState({ guessedReferences: refs });
  }

  async addFieldToConfirmedList(field, key, list) {
    if (field) {
      let user = await this.fetchAuthorInformation(field);
      let personal = {};

      if (user) {
        personal = {
          ethAddress: user.ethereumAddress,
          avatar: user.avatar,
          email: user.email
        };
      }
      this.addField(key, list, {
        personal,
        fName: field.fName,
        lName: field.lName,
        refNumber: field.refNumber,
        id: uuidv1()
      });
    }
  }

  fetchAuthorInformation(field) {
    let url = queryString.stringify(field);
    return fetch(`${getDomain()}/api/users?${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(async response => {
        if (response.success) {
          if (response.data) {
            return response.data;
          }
          return null;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    console.log("changed");
    return (
      <Container>
        <Title>Summary Functional Component</Title>
        <Body>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <STitle>Addresses We Found</STitle>
            <Addresses>
              {this.props.addresses.map(a => {
                return <a href={"/bau"}>{a}</a>;
              })}
            </Addresses>
          </div>
        </Body>
        <Body>
          <Guess
            guessedFields={this.state.guessedFields}
            confirmAuthor={async id => {
              let field = this.state.guessedFields.find(f => f.id === id);
              this.removeField(
                "guessedFields",
                [...this.state.guessedFields],
                id
              );
              await this.addFieldToConfirmedList(field, "confirmedFields", [
                ...this.state.confirmedFields
              ]);
            }}
            onAdd={() => {
              this.addField("guessedFields", [...this.state.guessedFields], {
                fName: "",
                lName: "",
                id: uuidv1()
              });
            }}
            onDelete={id => {
              this.removeField(
                "guessedFields",
                [...this.state.guessedFields],
                id
              );
            }}
            onChange={(key, id, value) => {
              this.updateFields(
                "guessedFields",
                [...this.state.guessedFields],
                key,
                id,
                value
              );
            }}
          />
          <Confirmed
            fields={this.state.confirmedFields}
            onDelete={id => {
              let field = this.state.confirmedFields.find(f => f.id === id);
              this.removeField(
                "confirmedFields",
                [...this.state.confirmedFields],
                id
              );
              if (field) {
                this.addField(
                  "guessedFields",
                  [...this.state.guessedFields],
                  field
                );
              }
            }}
          />
        </Body>
        <Body>
          <References
            references={this.state.guessedReferences}
            onChange={(refNumber, key, id, value) => {
              let refs = [...this.state.guessedReferences];
              let entity = refs
                .find(r => r.number === refNumber)
                .entities.find(e => e.id === id);
              entity[key] = value;
              this.setState({ guessedReferences: refs });
            }}
            onDelete={(refNumber, id) => {
              this.removeReference(refNumber, id);
            }}
            onAdd={refNumber => {
              this.addReference(refNumber, {
                fName: "",
                lName: "",
                id: uuidv1()
              });
            }}
            confirmReference={async (refNumber, id) => {
              let field = this.state.guessedReferences
                .find(r => r.number === refNumber)
                .entities.find(e => e.id === id);
              field.refNumber = refNumber;
              this.removeReference(refNumber, id);
              await this.addFieldToConfirmedList(field, "confirmedReferences", [
                ...this.state.confirmedReferences
              ]);
            }}
          />
          <ConfirmedReferences
            confirmedReferences={this.state.confirmedReferences}
            onDelete={(id, refNumber) => {
              let field = this.state.confirmedReferences.find(f => f.id === id);
              this.removeField(
                "confirmedReferences",
                [...this.state.confirmedReferences],
                id
              );
              this.addReference(refNumber, field);
            }}
          />
        </Body>
      </Container>
    );
  }
}

Summary.propTypes = { entities: PropTypes.any };

export default Summary;
