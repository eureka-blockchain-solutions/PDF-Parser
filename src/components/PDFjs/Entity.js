import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Entity = ({ entity }) => {
  return <Container>{entity.text}</Container>;
};

export default Entity;
