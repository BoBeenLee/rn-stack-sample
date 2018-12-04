import React from "react";
import moment from "moment";
import styled from "styled-components/native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { FilmCard, TodoCard } from "../../src/components";

const Container = styled.View`
  flex: 1;
`;

const film = {
  id: "ZmlsbXM6MQ==",
  title: "A New Hope",
  episodeID: 4,
  created: "2014-12-10T14:23:31.880Z",
  openingCrawl:
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  director: "George Lucas",
  producers: ["Gary Kurtz", "Rick McCallum"]
};

storiesOf("Card", module)
  .addDecorator((getStory: any) => <Container>{getStory()}</Container>)
  .add("FilmCard", () => (
    <FilmCard
      title={film.title}
      created={moment(film.created).format("YYYY-MM-DD")}
      openingCrawl={film.openingCrawl}
    />
  ))
  .add("TodoCard", () => (
    <React.Fragment>
      <TodoCard order={1} content={"First"} />
      <TodoCard order={2} content={"Second"} />
      <TodoCard order={3} content={"Third"} />
    </React.Fragment>
  ));
