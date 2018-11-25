import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";
import moment from "moment";
import styled from "styled-components/native";

import { FilmCard, Title } from "../components";
import { IFilmItem, ISwapiStore, getSwapiStore } from "../stores/SwapiStore";

interface IInject {
  swapiStore: ISwapiStore;
}

interface IProps extends IInject {
  componentId: string;
}

interface IStates {
  films: IFilmItem[];
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const FilmList = styled<FlatListProps<IFilmItem>>(FlatList).attrs({})``;
const Text = styled.Text``;

@inject(
  (stores: any): IInject => ({
    swapiStore: getSwapiStore(stores)
  })
)
@observer
class SwapiScreen extends Component<IProps, IStates> {

  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  public async componentDidMount() {
    const { fetchFilms } = this.props.swapiStore;
    this.setState({
      films: await fetchFilms()
    });
  }

  public render() {
    const { films } = this.state;
    return (
      <Container>
        <Title>Swapi Film</Title>
        <FilmList
          data={films}
          keyExtractor={this.filmKeyExtractor}
          renderItem={this.renderFilmItem}
        />
      </Container>
    );
  }

  private filmKeyExtractor = (__: any, index: number) => {
    return `film${index}`;
  };

  private renderFilmItem = (props: ListRenderItemInfo<IFilmItem>) => {
    const { title, created, openingCrawl } = props.item;
    return (<FilmCard
      title={title}
      created={moment(created).format("YYYY-MM-DD")}
      openingCrawl={openingCrawl}
    />);
  };
}

export default SwapiScreen;
