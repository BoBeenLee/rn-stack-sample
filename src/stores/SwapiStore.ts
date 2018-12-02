import _ from "lodash";
import { flow, getRoot, Instance, types } from "mobx-state-tree";

import swapiFetch from "../configs/swapi";
import { delay } from "../utils/common";

const ALL_FILMS = `
query {
    allFilms {
      films {
        id
        title
        episodeID
        created
        openingCrawl
        director
        producers
      }
    }
  }
`;

export interface IFilmItem {
  id: string;
  title: string;
  episodeID: number;
  created: string;
  openingCrawl: string;
}

const SwapiStore = types.model("SwapiStore", {}).actions(__ => {
  const fetchFilms = flow<IFilmItem[]>(function* () {
    const response = yield swapiFetch(ALL_FILMS);
    yield delay(2000);
    return _.get(response, ["data", "allFilms", "films"], []);
  });
  return {
    fetchFilms
  };
});

export const getSwapiStore = stores => stores.store.swapiStore;
export type ISwapiStore = typeof SwapiStore.Type;
export default SwapiStore;
