import React from "react";
import styled from "styled-components";
import { __ALERT_SUCCESS } from "../../helpers/colors";
import { ConfirmedRow } from "./ConfirmedRow";

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

const ConfirmedReferences = ({ confirmedReferences, ...otherProps }) => {
  return (
    <Container>
      <Title>Confirmed References</Title>
      <Body>
        {confirmedReferences.map((field, i) => {
          console.log(field);
          return (
            <ConfirmedRow
              field={field}
              key={field.id}
              index={i}
              onDelete={id => {
                otherProps.onDelete(id, field.refNumber);
              }}
            />
          );
        })}
      </Body>
    </Container>
  );
};

export default ConfirmedReferences;
