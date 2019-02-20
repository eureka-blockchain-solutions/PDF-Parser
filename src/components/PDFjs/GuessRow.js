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

const IconsContainer = styled.div`
  display: flex;
  margin-top: 23px;
  align-items: center;
  margin-left: 8px;
  justify-content: space-around;
`;

const IContainer = styled.div`
  width: 22px;
  height: 22px;
  background: ${__ALERT_ERROR};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-radius: 4px;
`;

const Confirm = styled.div`
  background: ${__ALERT_SUCCESS};
  padding: 2px 4px;
  border-radius: 4px;
  margin-right: 10px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 8px;
  cursor: pointer;
  line-height: 2.37;
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
          onChange={value => {
            otherProps.onChange("fName", field.id, value);
          }}
          status={""}
          placeholder={"First Name"}
        />
      </InputContainer>
      <InputContainer>
        <Label>Last Name</Label>
        <InputField
          value={lName}
          onChange={value => {
            otherProps.onChange("lName", field.id, value);
          }}
          status={""}
          placeholder={"Last Name"}
        />
      </InputContainer>

      <IconsContainer>
        <Confirm
          onClick={() => {
            otherProps.confirmAuthor(field.id);
          }}
        >
          OK
        </Confirm>
        <IContainer
          onClick={() => {
            otherProps.onDelete(field.id);
          }}
        >
          <Icon icon={"delete"} width={10} height={10} color={"white"} />
        </IContainer>
      </IconsContainer>
    </Container>
  );
};

export default GuessRow;
