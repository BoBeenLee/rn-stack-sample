import React, { Component } from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";

interface IProps {
  style?: TextProps;
  type: "default" | "primary";
  children: string;
  onPress?: () => void;
}

const TouchabledContainer = styled.TouchableOpacity``;

const Container = styled.Text``;

const helloJson = require("assets-json/hello.json");

class Button extends Component<IProps> {
  public render() {
    const { style, children, onPress } = this.props;
    return (
      <TouchabledContainer onPress={onPress}>
        <Container style={style}>{children}</Container>
      </TouchabledContainer>
    );
  }
}

export default Button;
