import _ from "lodash";
import { Navigation } from "react-native-navigation";

import AppScreen from "./screens/AppScreen";
import TodoScreen from "./screens/TodoScreen";
import SwapiScreen from "./screens/SwapiScreen";
import withStore from "./hoc/withStore";
import RootStore from "./stores/RootStore";
import { setup, withOverlay } from "../ReactotronConfig";

const rootStore = RootStore.create();

setup(rootStore);

const withStoreAndOverlay = _.flow([
  _.partial(withStore, _, rootStore),
  withOverlay
]);

Navigation.registerComponent("AppScreen", () => withStoreAndOverlay(AppScreen));
Navigation.registerComponent("TodoScreen", () =>
  withStoreAndOverlay(TodoScreen)
);
Navigation.registerComponent("SwapiScreen", () =>
  withStoreAndOverlay(SwapiScreen)
);

function start() {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      layout: {
        orientation: ["portrait"]
      },
      statusBar: {
        backgroundColor: "white",
        style: "dark"
      }
    });

    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: "AppScreen"
              }
            }
          ]
        }
      }
    });
  });
}

export default start;
