import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import styled from "styled-components/native";

interface IProps {
  componentId: string;
}

const Container = styled.View``;

const NavigateButton = styled.Button``;

class AppScreen extends Component<IProps> {
  public render() {
    return (
      <Container>
        <NavigateButton title="Todo" onPress={this.navigateTodo} />
        <NavigateButton title="Swapi" onPress={this.navigateSwapi} />
      </Container>
    );
  }

  private navigateTodo = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: "TodoScreen"
      }
    });
  };

  private navigateSwapi = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: "SwapiScreen"
      }
    });
  };
}

export default AppScreen;
