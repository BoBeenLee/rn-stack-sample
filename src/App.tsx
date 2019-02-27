import _ from "lodash";
import { Navigation } from "react-native-navigation";

import { getRootStore } from "./stores/RootStore";
import { setup } from "../ReactotronConfig";
import { registerScreens } from "./screens";

const rootStore = getRootStore();

setup(rootStore);

registerScreens(rootStore);

function start() {
  Navigation.events().registerAppLaunchedListener(() => {
    rootStore.navigator.start();
  });
}

start();
