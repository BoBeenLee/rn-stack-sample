import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text``;

const HeaderDate = styled.Text``;

const Content = styled.Text`
  flex: 1;
`;

const FilmCard = () => {
  return (
    <Container>
      <Header>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDate>Date</HeaderDate>
      </Header>
      <Content>Content</Content>
    </Container>
  );
};

export default FilmCard;
