import Reactotron from 'reactotron-react-native';
import { mst } from "reactotron-mst";
import _ from "lodash";

export function setup(store) {
    Reactotron
        .configure()
        .useReactNative()
        .use(mst())
        .connect();

    (Reactotron).trackMstNode(store);
    Reactotron.use(__ => ({
        onCommand: async ({ type, payload }) => {
            if (type === "custom" && payload === "addTodo") {
                store.addTodo(`${_.uniqueId("hello")}`);
            }
        }
    }));
}


