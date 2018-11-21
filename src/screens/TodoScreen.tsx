import React, { Component } from 'react';
import { inject, observer } from "mobx-react/native";
import { FlatList, Text } from 'react-native';
import styled from "styled-components/native";

import { Title } from "../components";
import { ITodoStore } from "../stores/TodoStore";

interface IInject {
    toastStore: ITodoStore;
}

const Container = styled.View``;

const TodoList = styled(FlatList).attrs({})``;

@inject(
    (stores: any): IInject => ({
        toastStore: stores.store
    })
)
@observer
class TodoScreen extends Component {
    public render() {
        return (
            <Container>
                <Title title="Todo List" />
                <TodoList
                    data={["1", "2", "3"]}
                    keyExtractor={this.todoKeyExtractor}
                    renderItem={this.renderTodoItem}
                />
            </Container>
        );
    }

    private todoKeyExtractor = (__: any, index: number) => {
        return `todo${index}`
    };

    private renderTodoItem = () => {
        return (<Text>
            Hello World
        </Text>);
    };
}

export default TodoScreen;
