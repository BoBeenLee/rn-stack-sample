import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";
import moment from "moment";
import styled from "styled-components/native";

import { FilmCard, Title, TopBar } from "../components";
import { IFilmItem, ISwapiStore, getSwapiStore } from "../stores/SwapiStore";
import withLoading, { ILoadingProps } from "../hoc/withLoading";
import { INavigator } from "../stores/Navigator";

interface IInject {
  navigator: INavigator;
  swapiStore: ISwapiStore;
}

interface IProps extends IInject, ILoadingProps {
  componentId: string;
}

interface IStates {
  refresh: boolean;
  films: IFilmItem[];
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const FilmTitle = styled(Title)`
  padding-bottom: 0px;
`;

const FilmList = styled<FlatListProps<IFilmItem>>(FlatList).attrs({})``;

@inject(
  (stores: any): IInject => ({
    navigator: stores.store.navigator,
    swapiStore: getSwapiStore(stores)
  })
)
@withLoading
@observer
class SwapiScreen extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      films: [],
      refresh: false
    };
    this.initialize = props.wrapperLoading(this.initialize, true);
    this.refresh = props.wrapperLoading(this.refresh, false);
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { films, refresh } = this.state;
    return (
      <Container>
        <TopBar onBackPress={this.back} />
        <FilmList
          ListHeaderComponent={<FilmTitle>Swapi Film</FilmTitle>}
          data={films}
          keyExtractor={this.filmKeyExtractor}
          renderItem={this.renderFilmItem}
          refreshing={refresh}
          onRefresh={this.refresh}
        />
      </Container>
    );
  }

  private initialize = async () => {
    await this.fetchFilms();
  };

  private refresh = async () => {
    this.setState({ refresh: true });
    await this.fetchFilms();
    this.setState({ refresh: false });
  };

  private fetchFilms = async () => {
    const { fetchFilms } = this.props.swapiStore;
    this.setState({
      films: await fetchFilms()
    });
  };

  private filmKeyExtractor = (__: any, index: number) => {
    return `film${index}`;
  };

  private renderFilmItem = (props: ListRenderItemInfo<IFilmItem>) => {
    const { title, created, openingCrawl } = props.item;
    return (
      <FilmCard
        title={title}
        created={moment(created).format("YYYY-MM-DD")}
        openingCrawl={openingCrawl}
      />
    );
  };

  private back = () => {
    const { componentId, navigator } = this.props;
    navigator.pop(componentId);
  }
}

export default SwapiScreen;
