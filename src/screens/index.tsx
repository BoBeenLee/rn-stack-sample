import _ from "lodash";
import { Navigation } from "react-native-navigation";

import AppScreen from "./AppScreen";
import TodoScreen from "./TodoScreen";
import SwapiScreen from "./SwapiScreen";
import ErrorScreen from "./ErrorScreen";
import withStore from "../hoc/withStore";
import { withOverlay } from "../../ReactotronConfig";

function registerScreens(store) {
  const withStoreAndOverlay = _.flow([
    _.partial(withStore, _, store),
    withOverlay
  ]);

  Navigation.registerComponent("AppScreen", () =>
    withStoreAndOverlay(AppScreen)
  );
  Navigation.registerComponent("TodoScreen", () =>
    withStoreAndOverlay(TodoScreen)
  );
  Navigation.registerComponent("SwapiScreen", () =>
    withStoreAndOverlay(SwapiScreen)
  );
  Navigation.registerComponent("ErrorScreen", () =>
    withStoreAndOverlay(ErrorScreen)
  );
}

export { registerScreens };
