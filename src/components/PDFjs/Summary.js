import React from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import Guess from "./Guess";
import Confirmed from "./Confirmed";

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${__ALERT_ERROR};
  text-transform: uppercase;
`;

const Body = styled.div``;

const Summary = () => {
  return (
    <Container>
      <Title>Summary Functional Component</Title>
      <Body>
        <Guess />
        <Confirmed />
      </Body>
    </Container>
  );
};

export default Summary;
