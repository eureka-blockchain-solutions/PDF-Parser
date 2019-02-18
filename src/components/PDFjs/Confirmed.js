import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_INFO, __ALERT_SUCCESS } from "../../helpers/colors";
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
        <Body>
          {this.props.fields.map((field, i) => {
            return (
              <ConfirmedRow
                field={field}
                key={field.id}
                index={i}
                onDelete={id => {
                  this.props.onDelete(id);
                }}
              />
            );
          })}
        </Body>
      </Container>
    );
  }
}

export default Confirmed;
