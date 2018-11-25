import React, { SFC } from "react";
import styled from "styled-components/native";

import Title from "./Title";

interface IProps {
  title: string;
  created: string;
  openingCrawl: string;
}

const Container = styled.View``;

const Header = styled.View``;

const Date = styled.Text``;

const Content = styled.View``;

const Text = styled.Text`
  flex: 1;
  text-align: center;
`;

const FilmCard: SFC<IProps> = ({ title, created, openingCrawl }) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <Text>{openingCrawl}</Text>
      </Content>
    </Container>
  );
};

export default FilmCard;
