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
  margin-right: 32px;
`;

class Guess extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Guessed Authors</Title>{" "}
          <IconContainer
            onClick={() => {
              this.props.onAdd();
            }}
          >
            <Icon icon={"plus"} width={12} height={12} color={"white"} noMove />
          </IconContainer>
        </Header>

        <Body>
          {this.props.guessedFields.map(field => {
            return (
              <GuessRow
                field={field}
                key={field.id}
                confirmAuthor={id => {
                  this.props.confirmAuthor(id);
                }}
                onDelete={id => {
                  this.props.onDelete(id);
                }}
                onChange={(key, id, value) => {
                  this.props.onChange(key, id, value);
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
