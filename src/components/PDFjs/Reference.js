import React from "react";
import styled from "styled-components";
import { __FIFTH, __GRAY_200 } from "../../helpers/colors";
import { EXTRACT_ENTITIES } from "./EXTRACT_ENTITY_FACTORY";
import GuessRow from "./GuessRow";
import uuidv1 from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${__GRAY_200};
  padding: 15px 10px 15px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.div`
  background: ${__FIFTH};
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Body = styled.div``;

const Text = styled.div`
  margin-left: 12px;
`;

const getField = entity => {
  return {
    fName: entity.text,
    lName: "",
    id: uuidv1()
  };
};
const Reference = ({ reference, ...otherProps }) => {
  let entities = EXTRACT_ENTITIES(reference.reference);
  return (
    <Container>
      <Header>
        <Number>{reference.number}</Number>
        <Text>{reference.reference}</Text>
      </Header>
      <Body>
        {entities.map(entity => {
          const field = getField(entity);
          return (
            <GuessRow
              field={field}
              key={field.id}
              confirmAuthor={id => {
                //TODO: this.props.confirmAuthor(id);
              }}
              onDelete={id => {
                // TODO: this.props.onDelete(id);
              }}
              onChange={(key, id, value) => {
                // TODO: this.props.onChange(key, id, value);
              }}
            />
          );
        })}
      </Body>
    </Container>
  );
};

export default Reference;
