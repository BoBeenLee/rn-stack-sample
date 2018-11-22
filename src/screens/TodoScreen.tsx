import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";

import { Title } from "../components";
import { IStores } from "../stores/RootStore";
import { ITodoStore, getTodoStore } from "../stores/TodoStore";

interface IInject {
  todoStore: ITodoStore;
}

const Container = styled.View``;

const TodoList = styled(FlatList).attrs({})``;

@inject(
  (stores: IStores): IInject => ({
    todoStore: getTodoStore(stores)
  })
)
@observer
class TodoScreen extends Component {
  public render() {
    return (
      <Container>
        <Title>Todo</Title>
        <TodoList
          data={["1", "2", "3"]}
          keyExtractor={this.todoKeyExtractor}
          renderItem={this.renderTodoItem}
        />
      </Container>
    );
  }

  private todoKeyExtractor = (__: any, index: number) => {
    return `todo${index}`;
  };

  private renderTodoItem = () => {
    return <Text>Hello World</Text>;
  };
}

export default TodoScreen;
