import React from "react";
import styled from "styled-components";
import {__ALERT_DANGER, __ALERT_WARNING, __GRAY_200} from "../../helpers/colors";

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: ${__ALERT_WARNING};
`;

const Body = styled.div`
  border-right: 1px solid ${__GRAY_200};
  padding: 0 15px 0 0;
`;

const References = ({ references, ...otherProps }) => {
  console.log(references);
  return (
    <Container>
      <Title>References we found</Title> <Body>ajosfjoas</Body>
    </Container>
  );
};

export default References;
