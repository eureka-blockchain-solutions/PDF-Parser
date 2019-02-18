import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import Guess from "./Guess";
import Confirmed from "./Confirmed";
import * as PropTypes from "prop-types";
import uuidv1 from "uuid";
import queryString from "querystring";
import GuessRow from "./GuessRow";
import { getDomain } from "../../helpers/getDomain";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${__ALERT_ERROR};
  text-transform: uppercase;
`;

const Body = styled.div`
  display: flex;
`;

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      guessedFields: [],
      confirmedFields: []
    };
  }

  componentDidMount() {
    this.initGuessedFields();
  }

  initGuessedFields() {
    let guessedFields = [...this.state.guessedFields];
    let { entities } = this.props;
    entities.map(entity => {
      entity = entity[0];
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

  updateFields(list, key, id, value) {
    const field = list.find(f => f.id === id);
    field[key] = value;
    this.setState({ list });
  }

  addField(key, list, obj) {
    list.push(obj);
    this.setState({ [key]: list });
  }

  removeField(key, list, id) {
    this.setState({
      [key]: list.filter(f => f.id !== id)
    });
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
            return response.data.ethereumAddress;
          }
          return null;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <Container>
        <Title>Summary Functional Component</Title>
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

              if (field) {
                let ethAddress = await this.fetchAuthorInformation(field);
                console.log(ethAddress);
                this.addField(
                  "confirmedFields",
                  [...this.state.confirmedFields],
                  {
                    ethAddress,
                    fName: field.fName,
                    lName: field.lName,
                    id: uuidv1()
                  }
                );
              }
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
              this.updateFields([...this.state.guessedFields], key, id, value);
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
      </Container>
    );
  }
}

Summary.propTypes = { entities: PropTypes.any };

export default Summary;
