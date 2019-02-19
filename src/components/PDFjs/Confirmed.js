import React, { Component } from "react";
import styled from "styled-components";
import { __ALERT_INFO, __ALERT_SUCCESS } from "../../helpers/colors";
import { ConfirmedRow } from "./ConfirmedRow";
import queryString from "querystring";
import { getDomain } from "../../helpers/getDomain";

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

  /*componentDidUpdate(prevProps, prevState) {
    if (prevProps.fields !== this.props.fields) {
      if (this.props.fields.length > 0) {
        let url = "";
        this.props.fields.forEach(f => {
          url += queryString.stringify(f);
        });

        console.log(url);
        fetch(`${getDomain()}/api/users?${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
          .then(response => response.json())
          .then(async response => {
            console.log(response);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
*/
  render() {
    return (
      <Container>
        <Title>Confirmed Authors</Title>
        {this.props.fields.length === 0 ? (
          <i style={{ padding: 15 }}>
            Confirm the authors in the left section.
          </i>
        ) : null}
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
