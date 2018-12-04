import config from "../../config.json";

enum ENV_TYPE {
  storybook = "storybook",
  development = "development"
}

const REACT_ENV = ((config as any).REACT_ENV as ENV_TYPE) || "development";

export const isDevelopment = () => REACT_ENV === "development";

export const isStorybook = () => REACT_ENV === "storybook";
