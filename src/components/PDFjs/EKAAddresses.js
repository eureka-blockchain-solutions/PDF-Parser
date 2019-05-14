import React from "react";
import styled from "styled-components";
import { __ALERT_WARNING } from "../../helpers/colors";
import { InitialPrefix } from "../../constants/Prefix";

const Container = styled.div`
  color: ${__ALERT_WARNING};
`;

const EKAAddresses = ({ address }) => {
  address = InitialPrefix + address;
  return (
    <Container>
      <a href={`http://localhost:3001/app/users/${address}`} target="_blank">
        {address}
      </a>
    </Container>
  );
};

export default EKAAddresses;
