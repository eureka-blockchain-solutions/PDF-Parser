import React from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${__ALERT_ERROR};
`;

const Body = styled.div``;

const Summary = () => {
  return (
    <Container>
      <Title>Summary Functional Component</Title>
      <Body>TODO</Body>
    </Container>
  );
};

export default Summary;
