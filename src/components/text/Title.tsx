import React, { SFC } from "react";
import { TextStyle } from "react-native";
import styled from "styled-components/native";

interface IProps {
  style?: TextStyle;
  children: string | JSX.Element;
}

const Container = styled.Text`
  font-size: 25px;
  font-weight: bold;
  padding-vertical: 15px;
  padding-horizontal: 10px;
`;

const Title: SFC<IProps> = ({ style, children }) => {
  return <Container style={style}>{children}</Container>;
};

export default Title;
