import React from "react";
import styled from "styled-components";
import { __ALERT_WARNING } from "../../helpers/colors";
import { InitialPrefix } from "../../constants/Prefix";

const Container = styled.div`
  color: ${__ALERT_WARNING};
`;

const EKAAddresses = ({ address }) => {
  return <Container>{InitialPrefix + address}</Container>;
};

export default EKAAddresses;
