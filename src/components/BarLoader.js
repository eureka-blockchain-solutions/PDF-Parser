import React from "react";
import styled, { keyframes } from "styled-components";
import { __FIFTH, __THIRD } from "../helpers/colors";


const Container = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 20px;
  background: ${__THIRD};
`;

const Progress = styled.div`
  background: ${__FIFTH};
  box-shadow: 0 2px 20px ${__FIFTH};
  width: ${props => props.progress}%;
  height: 100%;
  border-radius: 20px;
  position: relative;
`;

const Number = styled.div`
  top: -20px;
  right: -15px;
  position: absolute;
  font-weight: bold;
  color: ${__FIFTH};
`;

const BarLoader = ({ progress }) => {
  console.log(progress);
  return (
    <Container>
      <Progress progress={progress}>
        <Number>{progress}%</Number>
      </Progress>
    </Container>
  );
};

export default BarLoader;
