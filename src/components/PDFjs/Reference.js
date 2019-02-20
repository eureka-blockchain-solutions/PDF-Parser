import React from "react";
import styled from "styled-components";
import { __ALERT_DANGER, __FIFTH, __GRAY_200 } from "../../helpers/colors";
import { EXTRACT_ENTITIES } from "./EXTRACT_ENTITY_FACTORY";
import GuessRow from "./GuessRow";
import uuidv1 from "uuid";
import Icon from "../../views/icons/Icon";

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

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${__ALERT_DANGER};
  margin-left: auto;
  margin-top: -10px;
`;

const Text = styled.div`
  margin-left: 12px;
`;

const Reference = ({ reference, entity, ...otherProps }) => {
  return (
    <Container>
      <Header>
        <Number>{reference.number}</Number>
        <Text>{reference.reference}</Text>
      </Header>
      <IconContainer
        onClick={() => {
          otherProps.onAdd(reference.number);
        }}
      >
        <Icon icon={"plus"} width={12} height={12} color={"white"} noMove />
      </IconContainer>
      <Body>
        {reference.entities.map(entity => {
          return (
            <GuessRow
              field={entity}
              key={entity.id}
              confirmAuthor={id => {
                // this.props.confirmAuthor(id);
              }}
              onDelete={id => {
                // TODO: this.props.onDelete(id);
              }}
              onChange={(key, id, value) => {
                otherProps.onChange(key, id, value);
              }}
            />
          );
        })}
      </Body>
    </Container>
  );
};

export default Reference;
