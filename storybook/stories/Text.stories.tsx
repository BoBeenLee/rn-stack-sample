import React from "react";
import moment from "moment";
import styled from "styled-components/native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Title, Date } from "../../src/components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf("Text", module)
    .addDecorator((getStory: any) => <Container>{getStory()}</Container>)
    .add("Title", () => <Title>Title</Title>)
    .add("Date", () => <Date>Date</Date>);
