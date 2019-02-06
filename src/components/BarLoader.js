import React from "react";
import styled, { keyframes } from "styled-components";
import { __FIFTH, __THIRD } from "../helpers/colors";
import Icon from "../views/icons/Icon";

const Container = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 20px;
  background: ${__THIRD};
  position: relative;
  margin-top: 12px;
`;

const Progress = styled.div`
  background: ${__FIFTH};
  box-shadow: 0 1px 5px ${__FIFTH};
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

const FileName = styled.span`
  position: absolute;
  top: 15px;
  font-style: italic;
  color: ${__FIFTH};
`;

const BarLoader = ({ progress, name }) => {
  return (
    <Container>
      {name ? (
        <FileName>
          <Icon icon={"uploadPDF"} width={18} height={18} color={__FIFTH} />
          {name}
        </FileName>
      ) : null}

      <Progress progress={progress}>
        <Number>{progress}%</Number>
      </Progress>
    </Container>
  );
};

export default BarLoader;
