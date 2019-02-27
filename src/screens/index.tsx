import _ from "lodash";
import { Navigation } from "react-native-navigation";

import AppScreen from "./AppScreen";
import TodoScreen from "./TodoScreen";
import SwapiScreen from "./SwapiScreen";
import ErrorScreen from "./ErrorScreen";
import withStore from "../hoc/withStore";
import { withOverlay } from "../../ReactotronConfig";
import withNavigator from "../hoc/withNavigator";

function registerScreens(store) {
  const withStoreAndOverlay = _.flow([
    _.partial(withStore, _, store),
    withOverlay
  ]);

  Navigation.registerComponent("AppScreen", () =>
    withNavigator(withStoreAndOverlay(AppScreen), "AppScreen")
  );
  Navigation.registerComponent("TodoScreen", () =>
    withNavigator(withStoreAndOverlay(TodoScreen), "TodoScreen")
  );
  Navigation.registerComponent("SwapiScreen", () =>
    withNavigator(withStoreAndOverlay(SwapiScreen), "SwapiScreen")
  );
  Navigation.registerComponent("ErrorScreen", () =>
    withNavigator(withStoreAndOverlay(ErrorScreen), "ErrorScreen")
  );
}

export { registerScreens };
