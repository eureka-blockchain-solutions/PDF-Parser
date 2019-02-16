import React from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import Guess from "./Guess";
import Confirmed from "./Confirmed";

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

const Summary = ({ entities }) => {
  const normalized = entities.map(e => e[0]);
  return (
    <Container>
      <Title>Summary Functional Component</Title>
      <Body>
        <Guess entities={normalized} />
        <Confirmed />
      </Body>
    </Container>
  );
};

export default Summary;
