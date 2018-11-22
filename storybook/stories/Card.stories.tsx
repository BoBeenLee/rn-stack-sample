import React from "react";
import styled from "styled-components/native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { FilmCard } from "../../src/components";

const Container = styled.View`
  width: 300px;
`;

storiesOf("Card", module)
  .addDecorator((getStory: any) => <Container>{getStory()}</Container>)
  .add("FilmCard", () => <FilmCard />);
