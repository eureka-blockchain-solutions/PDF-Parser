import React from "react";
import styled from "styled-components";
import {
  __ALERT_DANGER,
  __ALERT_WARNING,
  __GRAY_200
} from "../../helpers/colors";
import Reference from "./Reference";

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: ${__ALERT_WARNING};
`;

const Body = styled.div`
  border-right: 1px solid ${__GRAY_200};
  padding: 0 15px 0 0;
  display: flex;
  flex-direction: column;
`;

const References = ({ references, ...otherProps }) => {
  return (
    <Container>
      <Title>References we found</Title>{" "}
      <Body>
        {references.length === 0 ? (
          <i>We were not able to find any references</i>
        ) : null}
        {references.map(ref => {
          return (
            <Reference
              reference={ref}
              key={ref.number}
              onChange={(key, id, value) => {
                otherProps.onChange(key, id, value);
              }}
              onDelete={id => {
                otherProps.onDelete(id);
              }}
              confirmReference={id => {
                otherProps.confirmReference(id);
              }}
            />
          );
        })}
      </Body>
    </Container>
  );
};

export default References;
