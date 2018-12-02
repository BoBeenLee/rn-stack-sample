import React, { Component } from 'react';
import { inject, observer } from "mobx-react/native";
import styled from "styled-components/native";

import { Title } from "../components";
import { IRootStore } from "../stores/RootStore";

interface IInject {
    rootStore: IRootStore;
}

interface IProps extends IInject {
    componentId: string;
}

const Container = styled.View`
    flex: 1;
`;

const ErrorButton = styled.Button``;


@inject(
    (stores: any): IInject => ({
        rootStore: stores.store
    })
)
@observer
class ErrorScreen extends Component<IProps> {

    public render() {
        return (
            <Container>
                <Title>Throw Error</Title>
                <ErrorButton title="Throw Error" onPress={this.onErrorPress} />
            </Container>
        );
    }

    private onErrorPress = () => {
        const { rootStore } = this.props;
        rootStore.sendError();
    }
}

export default ErrorScreen;
