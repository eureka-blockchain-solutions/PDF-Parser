import React from "react";
import styled from "styled-components";
import { __FIFTH, __GRAY_200 } from "../../helpers/colors";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${__GRAY_200};
  padding: 15px 10px 15px 0;
`;

const Number = styled.div`
  background: ${__FIFTH};
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Text = styled.div`
  margin-left: 10px;
`;
const Reference = ({ reference, ...otherProps }) => {
  return (
    <Container>
      <Number>{reference.number}</Number>
      <Text>{reference.reference}</Text>
    </Container>
  );
};

export default Reference;
