import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_DANGER, __GRAY_200 } from "../../helpers/colors";
import GuessRow from "./GuessRow";

const Container = styled.div`
  flex: 1;
`;
const Body = styled.div`
  border-right: 1px solid ${__GRAY_200};
  padding: 0 15px 0 0;
`;
const Title = styled.h3`
  color: ${__ALERT_DANGER};
`;

class Guess extends Component {
  constructor() {
    super();
    this.state = {
      fields: []
    };
  }

  componentDidMount() {
    let fields = [...this.state.fields];
    this.props.entities.map((entity, index) => {
      const fName = entity.firstName;
      const lName = entity.lastName;
      const fNameValue = fName
        ? fName.charAt(0).toUpperCase() + fName.slice(1)
        : "";
      const lNameValue = lName
        ? lName.charAt(0).toUpperCase() + lName.slice(1)
        : "";
      let field = { fName: fNameValue, lName: lNameValue, index };
      fields.push(field);
    });
    this.setState({ fields });
  }

  updateFields(key, index, value) {
    const fields = [...this.state.fields];
    const field = fields.find(f => f.index === index);
    field[key] = value;
    this.setState({ fields });
  }

  render() {
    return (
      <Container>
        <Title>Guessed Authors</Title>
        <Body>
          {this.state.fields.map(field => {
            return (
              <GuessRow
                field={field}
                key={field.index}
                onChange={(key, index, value) => {
                  this.updateFields(key, index, value);
                }}
              />
            );
          })}
        </Body>
      </Container>
    );
  }
}

export default Guess;
