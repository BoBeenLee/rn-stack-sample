import hoistNonReactStatic from "hoist-non-react-statics";
import React, { Component } from "react";
import { Navigation } from "react-native-navigation";

import { getRootStore } from "../stores/RootStore";

interface IProps {
    componentId: string;
}

const withNavigator = <P extends object>(
    TargetComponent: React.ComponentType<P>,
    componentName: string
): any => {
    const WithNavigator = class extends Component<P & IProps> {
        constructor(props: P & IProps) {
            super(props);
            Navigation.events().bindComponent(this);
        }

        public componentDidAppear() {
            const { componentId } = this.props;
            getRootStore().navigator.setCurrentComponent(componentId, componentName);
        }

        public render() {
            return <TargetComponent {...this.props} />;
        }
    };
    hoistNonReactStatic(WithNavigator, TargetComponent as any);
    return WithNavigator;
};

export default withNavigator;
