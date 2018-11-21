import { Navigation } from "react-native-navigation";

import TodoScreen from "./screens/TodoScreen";

Navigation.registerComponent("TodoScreen", () => TodoScreen);

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
