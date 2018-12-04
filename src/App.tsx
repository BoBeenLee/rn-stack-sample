import _ from "lodash";
import { Navigation } from "react-native-navigation";

import RootStore from "./stores/RootStore";
import { setup } from "../ReactotronConfig";
import { registerScreens } from "./screens";

const rootStore = RootStore.create();

setup(rootStore);

registerScreens(rootStore);

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

start();
