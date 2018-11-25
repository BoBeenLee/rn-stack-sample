import React, { SFC } from "react";
import styled from "styled-components/native";

interface IProps {
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
