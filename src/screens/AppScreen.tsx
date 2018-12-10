import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import styled from "styled-components/native";
import firebase from "react-native-firebase";

import { pushTransition } from "./styles/animation";
import { SCREEN_IDS } from "./constant";
import { REMOTE_CONFIG_VARIABLES } from "../configs/firebase";

interface IProps {
  componentId: string;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const NavigateButton = styled.Button``;

class AppScreen extends Component<IProps> {
  constructor(props) {
    super(props);

    firebase.analytics().setUserProperties({
      height: String(Dimensions.get("screen").height),
      width: String(Dimensions.get("screen").width),
      username: "anonymous"
    });
    firebase.analytics().setAnalyticsCollectionEnabled(true);
  }

  public componentDidMount() {
    firebase
      .auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log("default app user ->", credential.user.toJSON());
        }
      });
  }

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
    firebase.analytics().setCurrentScreen(SCREEN_IDS.TodoScreen);
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
    firebase.analytics().setCurrentScreen(SCREEN_IDS.ErrorScreen);
    Navigation.push(componentId, {
      component: {
        name: SCREEN_IDS.ErrorScreen,
        options: {
          animations: pushTransition as any
        }
      }
    });
  };

  private navigateSwapi = () => {
    const { componentId } = this.props;
    firebase.analytics().setCurrentScreen(SCREEN_IDS.SwapiScreen);
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
