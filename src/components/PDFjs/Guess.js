import React, { Component } from "react";
import styled from "styled-components";
import {__ALERT_DANGER, __GRAY_200} from "../../helpers/colors";
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
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Title>Guessed Authors</Title>
        <Body>
          {this.props.entities.map((e, i) => {
            return <GuessRow entity={e} key={i} />;
          })}
        </Body>
      </Container>
    );
  }
}

export default Guess;
