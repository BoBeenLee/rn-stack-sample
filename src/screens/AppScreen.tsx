import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import styled from "styled-components/native";

import { pushTransition } from "./styles/animation";
import { SCREEN_IDS } from "./constant";

import { INavigator } from "../stores/Navigator";
import { IStores } from "../stores/RootStore";

interface IInject {
  navigator: INavigator;
}

interface IProps extends IInject {
  componentId: string;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const NavigateButton = styled.Button``;

@inject(
  (stores: IStores): IInject => ({
    navigator: stores.store.navigator
  })
)
@observer
class AppScreen extends Component<IProps> {
  public render() {
    return (
      <Container>
        <NavigateButton title="Todo" onPress={this.navigateTodo} />
        <NavigateButton title="Swapi List" onPress={this.navigateSwapi} />
        <NavigateButton title="Throw Error" onPress={this.navigateThrowError} />
      </Container>
    );
  }

  private navigateTodo = () => {
    const { componentId, navigator } = this.props;
    navigator.push(componentId, {
      component: {
        name: SCREEN_IDS.TodoScreen,
        options: {
          animations: pushTransition as any
        }
      }
    });
  };

  private navigateThrowError = () => {
    const { componentId, navigator } = this.props;
    navigator.push(componentId, {
      component: {
        name: "ErrorScreen",
        options: {
          animations: pushTransition as any
        }
      }
    });
  }

  private navigateSwapi = () => {
    const { componentId, navigator } = this.props;
    navigator.push(componentId, {
      component: {
        name: SCREEN_IDS.SwapiScreen,
        options: {
          animations: pushTransition as any
        }
      }
    });
  };
}

export default AppScreen;
