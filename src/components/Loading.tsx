import React, { Component } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 25px;
`;

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
