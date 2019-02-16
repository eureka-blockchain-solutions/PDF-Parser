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

  updateFields(key, id, value) {
    const guessedFields = [...this.state.guessedFields];
    const field = guessedFields.find(f => f.id === id);
    field[key] = value;
    this.setState({ guessedFields });
  }

  addField() {
    let guessedFields = [...this.state.guessedFields];
    guessedFields.push({
      fName: "",
      lName: "",
      id: uuidv1()
    });
    this.setState({ guessedFields });
  }

  removeField(id) {
    let fields = [...this.state.guessedFields];
    this.setState({
      guessedFields: fields.filter(f => f.id !== id)
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
              this.addField();
            }}
            onDelete={id => {
              this.removeField(id);
            }}
            onChange={(key, id, value) => {
              this.updateFields(key, id, value);
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
