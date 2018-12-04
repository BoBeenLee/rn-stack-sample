import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import styled from "styled-components/native";

import { pushTransition } from "./styles/animation";
import { SCREEN_IDS } from "./constant";

interface IProps {
  componentId: string;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const NavigateButton = styled.Button``;

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
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: SCREEN_IDS.TodoScreen,
        options: {
          animations: pushTransition as any
        }
      }
    });
  };

  private navigateThrowError = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: "ErrorScreen",
        options: {
          animations: pushTransition as any
        }
      }
    });
  }

  private navigateSwapi = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
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
