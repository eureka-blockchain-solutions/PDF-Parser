import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_INFO, __ALERT_SUCCESS } from "../../helpers/colors";

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: ${__ALERT_SUCCESS};
`;

class Confirmed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Title>Confirmed Authors</Title>
      </Container>
    );
  }
}

export default Confirmed;
