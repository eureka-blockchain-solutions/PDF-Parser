import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import Guess from "./Guess";
import Confirmed from "./Confirmed";
import * as PropTypes from "prop-types";
import uuidv1 from "uuid";
import GuessRow from "./GuessRow";

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

  addField(key, list) {
    list.push({
      fName: "",
      lName: "",
      id: uuidv1()
    });
    this.setState({ [key]: list });
  }

  removeField(key, list, id) {
    this.setState({
      [key]: list.filter(f => f.id !== id)
    });
  }

  render() {
    return (
      <Container>
        <Title>Summary Functional Component</Title>
        <Body>
          <Guess
            guessedFields={this.state.guessedFields}
            confirmAuthor={id => {
              this.removeField(id);
            }}
            onAdd={() => {
              this.addField("guessedFields", [...this.state.guessedFields]);
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
          <Confirmed />
        </Body>
      </Container>
    );
  }
}

Summary.propTypes = { entities: PropTypes.any };

export default Summary;
