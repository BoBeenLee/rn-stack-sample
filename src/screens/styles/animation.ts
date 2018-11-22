import { Platform } from "react-native";

export const pushTransition =
  Platform.OS === "android"
    ? {
        pop: {
          content: {
            x: {
              duration: 300,
              from: 0,
              interpolation: "decelerate",
              to: 1000
            }
          }
        },
        push: {
          content: {
            x: {
              duration: 500,
              from: 1000,
              interpolation: "accelerate",
              to: 0
            }
          }
        }
      }
    : undefined;
