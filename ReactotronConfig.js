import Reactotron from 'reactotron-react-native';
import { mst } from "reactotron-mst";

Reactotron
    .configure()
    .useReactNative()
    .use(mst())
    .connect();
