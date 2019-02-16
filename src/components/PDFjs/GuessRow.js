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

const GuessRow = ({ field, ...otherProps }) => {
  const fName = field.fName;
  const lName = field.lName;
  return (
    <Container>
      <InputContainer>
        <Label>First Name</Label>
        <InputField
          value={fName}
          onChange={e => {
            otherProps.onChange("fName", field.id, e.target.value);
          }}
          status={""}
          placeholder={"First Name"}
        />
      </InputContainer>
      <InputContainer>
        <Label>Last Name</Label>
        <InputField
          value={lName}
          onChange={e => {
            otherProps.onChange("lName", field.id, e.target.value);
          }}
          status={""}
          placeholder={"Last Name"}
        />
      </InputContainer>
    </Container>
  );
};

export default GuessRow;
