import React from "react";
import styled from "styled-components";
import { InputField } from "../../views/design-components/Inputs";
import Icon from "../../views/icons/Icon";
import { __ALERT_ERROR, __ALERT_SUCCESS } from "../../helpers/colors";

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

const IconContainer = styled.div`
  display: flex;
  margin-top: 25px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Confirm = styled.div`
  background: ${__ALERT_SUCCESS};
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 9px;
  cursor: pointer;
  letter-spacing: 0.8px;
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

      <IconContainer
        onClick={() => {
          otherProps.onDelete(field.id);
        }}
      >
        <Icon icon={"delete"} width={10} height={10} color={__ALERT_ERROR} />
        <Confirm
          onClick={() => {
            otherProps.confirmAuthor(field.id);
          }}
        >
          Confirm
        </Confirm>
      </IconContainer>
    </Container>
  );
};

export default GuessRow;
