import React from "react";
import styled from "styled-components";
import Entity from "./Entity";

const Container = styled.div``;

const NamedEntities = ({ entities }) => {
  console.log(entities);
  return (
    <Container>
      {entities.map(array => {
        return array.map((entity, i) => {
          return <Entity key={i} entity={entity} />;
        });
      })}
    </Container>
  );
};

export default NamedEntities;
