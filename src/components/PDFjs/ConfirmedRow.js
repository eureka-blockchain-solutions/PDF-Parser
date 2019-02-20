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

const MyLink = styled.a`
  font-weight: bold;
  color: ${__ALERT_ERROR};
`;

const Delete = styled.div`
  margin-left: auto;
  margin-right: 15px;
`;

const Body = styled.div`
  display: flex;
`;

const Name = styled.div`
  display: flex;
`;

const SmallView = styled.div`
  display: flex;
`;

const SmallLabel = styled.div`
  font-size: 9px;
  font-weight: lighter;
  padding: 0px 5px;
  border-radius: 7px;
  background: ${__GRAY_200};
  margin: 0 4px;
`;

const AddressContainer = styled.div`
  margin-top: 7px;
`

export const ConfirmedRow = ({ field, index, ...otherProps }) => {
  const ethAddress = field.personal.ethAddress;

  return (
    <Container>
      <NamesContainer>
        <Avatar src={field.personal.avatar} width={22} height={22} right={10} />{" "}
        <Name>
          <SmallView>
            <SmallLabel>fName: </SmallLabel>
            {field.fName}
          </SmallView>
        </Name>
        <Name>
          <SmallView>
            <SmallLabel>lName: </SmallLabel>
            {field.lName}
          </SmallView>
        </Name>
      </NamesContainer>
      <Body>
        {ethAddress ? (
          <AddressContainer>
            <MyLink
              href={`http://localhost:3001/app/users/${ethAddress}`}
              target="_blank"
            >
              Author Lookup
            </MyLink>
            <small>, {ethAddress}</small>
          </AddressContainer>
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
