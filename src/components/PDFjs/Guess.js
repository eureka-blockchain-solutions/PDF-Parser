import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_DANGER, __GRAY_200, __THIRD } from "../../helpers/colors";
import GuessRow from "./GuessRow";
import Icon from "../../views/icons/Icon";
import uuidv1 from "uuid";

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

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${__ALERT_DANGER};
  margin-left: auto;
  margin-right: 24px;
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
    this.props.entities.map(entity => {
      const fName = entity.firstName;
      const lName = entity.lastName;
      const fNameValue = fName
        ? fName.charAt(0).toUpperCase() + fName.slice(1)
        : "";
      const lNameValue = lName
        ? lName.charAt(0).toUpperCase() + lName.slice(1)
        : "";
      let field = { fName: fNameValue, lName: lNameValue, id: uuidv1() };
      fields.push(field);
    });
    this.setState({ fields });
  }

  updateFields(key, id, value) {
    const fields = [...this.state.fields];
    const field = fields.find(f => f.id === id);
    field[key] = value;
    this.setState({ fields });
  }

  addField() {
    let fields = [...this.state.fields];
    fields.push({
      fName: "",
      lName: "",
      id: uuidv1()
    });
    this.setState({ fields });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Guessed Authors</Title>{" "}
          <IconContainer
            onClick={() => {
              this.addField();
            }}
          >
            <Icon icon={"plus"} width={12} height={12} color={"white"} noMove />
          </IconContainer>
        </Header>

        <Body>
          {this.state.fields.map(field => {
            return (
              <GuessRow
                field={field}
                key={field.id}
                onChange={(key, id, value) => {
                  this.updateFields(key, id, value);
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
