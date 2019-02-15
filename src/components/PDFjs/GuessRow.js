import React from "react";
import styled from "styled-components";
import { InputField } from "../../views/design-components/Inputs";

const Container = styled.div`
  display: flex;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 10px 0 0;
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: bold;
`;

const GuessRow = ({ entity, ...otherProps }) => {
  return (
    <Container>
      <InputContainer>
        <Label>First Name</Label>
        <InputField
          value={entity.firstName ? entity.firstName : ""}
          onChange={e => {
              // TODO: Update the value of this field dynamically
          }}
          status={""}
          placeholder={"First Name"}
        />
      </InputContainer>
      <InputContainer>
        <Label>Last Name</Label>
        <InputField
          value={entity.lastName ? entity.lastName : ""}
          onChange={e => {
              // TODO: Update the value of this field dynamically
          }}
          status={""}
          placeholder={"Last Name"}
        />
      </InputContainer>
    </Container>
  );
};

export default GuessRow;
