import Reactotron from "reactotron-react-native";
import { mst } from "reactotron-mst";
import _ from "lodash";
import { IRootStore } from "./src/stores/RootStore";

export const setup = (store: IRootStore) => {
  Reactotron.configure()
    .useReactNative()
    .use(mst())
    .connect();

  if (store) {
    (Reactotron as any).trackMstNode(store);
  }
  Reactotron.use(__ => ({
    onCommand: async ({ type, payload }) => {
      if (type === "custom" && payload === "addTodo") {
        store.todoStore.addTodo(`${_.uniqueId("helloworld")}`);
      } else if (type === "custom" && payload === "todoReset") {
        store.todoStore.reset();
      }
    }
  }));
  (console as any).tron = Reactotron;
};

export const withOverlay = App => {
  return (Reactotron as any).overlay(App);
};
