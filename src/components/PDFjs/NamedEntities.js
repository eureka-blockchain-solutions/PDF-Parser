import React from "react";
import styled from "styled-components";
import Entity from "./Entity";
import EKAAddresses from "./EKAAddresses";

const Container = styled.div``;

const NamedEntities = ({ addresses }) => {
  return (
    <Container>
      {addresses.map((address, i) => {
        return <EKAAddresses key={i} address={address} />;
      })}
    </Container>
  );
};

export default NamedEntities;
