import Reactotron, { storybook } from "reactotron-react-native";
import { mst } from "reactotron-mst";
import _ from "lodash";

export const setup = store => {
  Reactotron.configure()
    .useReactNative()
    .use(mst())
    .connect();

  if (store) {
    Reactotron.trackMstNode(store);
  }
  Reactotron.use(__ => ({
    onCommand: async ({ type, payload }) => {
      if (type === "custom" && payload === "addTodo") {
        store.addTodo(`${_.uniqueId("hello")}`);
      }
    }
  }));
  console.tron = Reactotron;
};

export const withOverlay = App => {
  return Reactotron.overlay(App);
};
