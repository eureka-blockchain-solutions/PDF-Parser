import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_DANGER } from "../../helpers/colors";

const Container = styled.div`
  flex: 1;
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
        <Title>Our Guessed Authors</Title>
      </Container>
    );
  }
}

export default Guess;
