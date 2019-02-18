import React from "react";
import styled from "styled-components";
import { __ALERT_ERROR, __GRAY_200 } from "../../helpers/colors";
import Icon from "../../views/icons/Icon";
import Avatar from "../../views/Avatar";

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${__GRAY_200};
  padding: 10px;
  flex-direction: column;
`;

const NamesContainer = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
`;

const MyLink = styled.a``;

const Delete = styled.div`
  margin-left: auto;
  margin-right: 15px;
`;

const Body = styled.div`
  display: flex;
`;

export const ConfirmedRow = ({ field, index, ...otherProps }) => {
  const ethAddress = field.personal.ethAddress;
  console.log(field);
  return (
    <Container>
      <NamesContainer>
        <Avatar src={field.personal.avatar} width={22} height={22} right={10} />{" "}
        {field.fName} {field.lName}
      </NamesContainer>
      <Body>
        {ethAddress ? (
          <MyLink
            href={`http://localhost:3001/app/users/${ethAddress}`}
            target="_blank"
          >
            Author Lookup
          </MyLink>
        ) : (
          <i>'No User found'</i>
        )}
        <Delete>
          <Icon
            icon={"delete"}
            width={12}
            height={12}
            color={__ALERT_ERROR}
            onClick={() => {
              otherProps.onDelete(field.id);
            }}
          />
        </Delete>
      </Body>
    </Container>
  );
};
