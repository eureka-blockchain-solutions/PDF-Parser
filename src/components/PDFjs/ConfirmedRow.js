import React from "react";
import styled from "styled-components";
import { __ALERT_ERROR } from "../../helpers/colors";
import Icon from "../../views/icons/Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NamesContainer = styled.div`
  display: flex;
  font-weight: bold;
`;

const Delete = styled.div`
  margin-left: auto;
  margin-right: 15px;
`;

export const ConfirmedRow = ({ field, index, ...otherProps }) => {
  return (
    <Container>
      <NamesContainer>
        {index + 1}) {field.fName} {field.lName}
      </NamesContainer>
      <Delete>
        <Icon
          icon={"delete"}
          width={12}
          height={12}
          color={__ALERT_ERROR}
          onClick={() => {
            otherProps.onDelete(field.id);
          }}
        />
      </Delete>
    </Container>
  );
};
