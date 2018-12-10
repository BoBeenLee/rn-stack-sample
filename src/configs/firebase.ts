import _ from "lodash";
import firebase from "react-native-firebase";

type RemoteConfigType = "todo_name";

const REMOTE_CONFIG_VARIABLES = new Map<RemoteConfigType, string>().set(
  "todo_name",
  "할것"
);

const initializeRemoteConfig = async () => {
  if (__DEV__) {
    firebase.config().enableDeveloperMode();
  }
  firebase.config().setDefaults({
    todo_name: "할것"
  });

  await firebase.config().fetch(0);
  const activated = await firebase.config().activateFetched();
  if (!activated) {
    console.log("Fetched data not activated");
  }

  for (const key of REMOTE_CONFIG_VARIABLES.keys()) {
    console.log(activated, (await firebase.config().getValue(key)).val());
    REMOTE_CONFIG_VARIABLES.set(
      key,
      (await firebase.config().getValue(key)).val()
    );
  }
};

export { initializeRemoteConfig, REMOTE_CONFIG_VARIABLES };
