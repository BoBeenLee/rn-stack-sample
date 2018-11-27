import React, { Component } from "react";
import styled from "styled-components/native";

const Container = styled.View``;

const Text = styled.Text``;

class Loading extends Component {
  public render() {
    return (
      <Container>
        <Text>Loading</Text>
      </Container>
    );
  }
}

export default Loading;
