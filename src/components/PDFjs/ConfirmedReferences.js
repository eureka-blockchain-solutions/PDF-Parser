import React from "react";
import styled from "styled-components";
import { __ALERT_SUCCESS } from "../../helpers/colors";

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: ${__ALERT_SUCCESS};
  padding-left: 15px;
`;

const Body = styled.div`
  padding: 15px;
`;

const ConfirmedReferences = () => {
  return (
    <Container>
      <Title>Confirmed References</Title>
      <Body>asfasfsaf</Body>
    </Container>
  );
};

export default ConfirmedReferences;
