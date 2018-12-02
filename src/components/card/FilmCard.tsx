import React, { SFC } from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

import Date from "../text/Date";
import Title from "../text/Title";

interface IProps {
  style?: ViewStyle;
  title: string;
  created: string;
  openingCrawl: string;
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;

const Content = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
`;

const FilmCard: SFC<IProps> = ({ title, created, openingCrawl }) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Date>{created}</Date>
      </Header>
      <Content>
        <Text>{openingCrawl}</Text>
      </Content>
    </Container>
  );
};

export default FilmCard;
