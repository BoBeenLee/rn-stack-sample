import React, { Component } from 'react';
import styled from "styled-components/native";

import Button from "./Button";
import { ViewProps } from 'react-native';

interface IProps {
    style?: ViewProps["style"];
    onBackPress: () => void;
}

const Container = styled.View`
    width: 100%;
    height: 80px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 20px;
`;

const BackButton = styled(Button)``;

class TopBar extends Component<IProps> {
    public render() {
        const { style, onBackPress } = this.props;
        return (
            <Container style={style}>
                <BackButton type="default" onPress={onBackPress}>Back</BackButton>
            </Container>
        );
    }
}

export default TopBar;
