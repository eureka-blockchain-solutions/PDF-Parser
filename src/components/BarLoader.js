import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const BarLoader = ({ progress }) => {
  return <Container>{progress}%</Container>;
};

export default BarLoader;
