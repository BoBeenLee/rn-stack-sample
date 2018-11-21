import { Provider } from "mobx-react/native";
import React, { Component } from "react";

const withStore = <P extends object>(
    TargetComponent: React.ComponentType<P>,
    store: any
): any => {
    return class WithStore extends Component<P> {
        public render() {
            return (
                <Provider store={store}>
                    <TargetComponent {...this.props} />
                </Provider>
            );
        }
    };
};

export default withStore;
