import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
`;

const Text = styled.div``;

class AddressExtractor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        AddressExtractor Component {this.props.pageNr}
        <Text>{this.props.text}</Text>
      </Container>
    );
  }
}

export default AddressExtractor;
