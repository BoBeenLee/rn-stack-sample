import React, { Component } from 'react';
import styled from "styled-components/native";

interface IProps {
    order: number;
    content: string;
}

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding-horizontal: 15px;
    padding-vertical: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
`;

const Order = styled.Text`
    width: 50px;
    font-size: 20px;
`;

const Content = styled.Text`
    font-size: 20px;
`;

class TodoCard extends Component<IProps> {
    public render() {
        const { order, content } = this.props;
        return (
            <Container>
                <Order>{order}</Order>
                <Content>{content}</Content>
            </Container>
        );
    }
}

export default TodoCard;
