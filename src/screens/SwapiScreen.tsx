import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { Title } from "../components";
import { ISwapiStore, getSwapiStore } from "../stores/SwapiStore";

interface IInject {
  swapiStore: ISwapiStore;
}

const FilmList = styled(FlatList).attrs({})``;

const Container = styled.View``;

const Text = styled.Text``;

@inject(
  (stores: any): IInject => ({
    swapiStore: getSwapiStore(stores)
  })
)
@observer
class SwapiScreen extends Component {
  public render() {
    return (
      <Container>
        <Title>Swapi Film</Title>
        <FilmList
          data={["1", "2", "3"]}
          keyExtractor={this.filmKeyExtractor}
          renderItem={this.renderFilmItem}
        />
      </Container>
    );
  }

  private filmKeyExtractor = (__: any, index: number) => {
    return `film${index}`;
  };

  private renderFilmItem = () => {
    return <Text>Hello World</Text>;
  };
}

export default SwapiScreen;
