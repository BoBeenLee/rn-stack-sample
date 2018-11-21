import { Navigation } from "react-native-navigation";

import TodoScreen from "./screens/TodoScreen";
import withStore from "./hoc/withStore";
import TodoStore from "./stores/TodoStore";
import "../ReactotronConfig";

const todoStore = TodoStore.create();

Navigation.registerComponent("TodoScreen", () => withStore(TodoScreen, todoStore));

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

    return Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: "TodoScreen"
              }
            }
          ]
        }
      }
    });
  });
}

export default start;
