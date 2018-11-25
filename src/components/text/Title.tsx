import React, { SFC } from "react";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

interface IProps {
  style?: ViewStyle;
  children: string | JSX.Element;
}

const Container = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Title: SFC<IProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
