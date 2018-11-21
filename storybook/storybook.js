import React, { Component } from "react";
import { getStorybookUI, configure } from "@storybook/react-native";
import { Navigation } from "react-native-navigation";

configure(() => {
  require("./stories");
}, module);

const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />;
  }
}

Navigation.registerComponent("storybook.UI", () => StorybookUIHMRRoot);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "storybook.UI"
            }
          }
        ],
        id: "storybook.UI"
      }
    }
  });
});

export default StorybookUIHMRRoot;
