import _ from "lodash";
import { flow, types } from "mobx-state-tree";
import { Navigation } from "react-native-navigation";

import { SCREEN_IDS } from "../screens/constant";
import { delay } from "../utils/common";

const Navigator = types
    .model("Navigator", {
        currentComponentId: types.optional(types.string, ""),
        currentComponentName: types.optional(types.string, ""),
        loading: types.optional(types.boolean, false)
    })
    .actions(self => {
        const setCurrentComponent = (
            componentId: string,
            componentName: string
        ) => {
            self.currentComponentId = componentId;
            self.currentComponentName = componentName;
        };

        const withNavigationLoading = flow(function* (
            navigationFunc: any,
            delaySeconds: number = 1500
        ) {
            if (!self.loading) {
                self.loading = true;
                navigationFunc();
                yield delay(delaySeconds);
                self.loading = false;
            }
        });

        const push = flow(function* (componentId: string, layout: any) {
            yield withNavigationLoading(() => {
                Navigation.push(componentId, layout);
            }, 1500);
        });
        const pop = flow(function* (componentId: string, params?: any) {
            yield withNavigationLoading(() => {
                Navigation.pop(componentId, params);
            }, 500);
        });

        const popTo = flow(function* (componentId: string) {
            yield withNavigationLoading(() => {
                Navigation.popTo(componentId);
            }, 500);
        });

        const showModal = flow(function* (layout: any) {
            yield withNavigationLoading(() => {
                Navigation.showModal(layout);
            }, 1000);
        });

        const showRootModal = flow(function* (layout: any) {
            yield withNavigationLoading(() => {
                Navigation.showModal({
                    stack: {
                        children: [layout]
                    }
                });
            }, 1000);
        });

        const dismissModal = flow(function* (componentId: string) {
            yield withNavigationLoading(() => {
                Navigation.dismissModal(componentId);
            }, 500);
        });

        const dismissAllModals = flow(function* () {
            yield withNavigationLoading(() => {
                Navigation.dismissAllModals();
            }, 500);
        });

        const mergeOptions = (componentId: string, params?: any) => {
            return Navigation.mergeOptions(componentId, params);
        };

        const showOverlay = (params: any) => {
            return Navigation.showOverlay(params);
        };

        const dismissOverlay = (componentId: string) => {
            return Navigation.dismissOverlay(componentId);
        };

        const setRoot = (params?: any) => {
            return Navigation.setRoot(params);
        };

        const setStackRoot = (componentId: string, params?: any) => {
            return Navigation.setStackRoot(componentId, params);
        };

        const start = () => {
            Navigation.setDefaultOptions({
                layout: {
                    backgroundColor: "#fff",
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
                                    name: SCREEN_IDS.AppScreen
                                }
                            }
                        ]
                    }
                }
            });
        };

        return {
            dismissAllModals,
            dismissModal,
            dismissOverlay,
            mergeOptions,
            pop,
            popTo,
            push,
            setCurrentComponent,
            setRoot,
            setStackRoot,
            showRootModal,
            showModal,
            showOverlay,
            start
        };
    });

export type INavigator = typeof Navigator.Type;
export default Navigator;
