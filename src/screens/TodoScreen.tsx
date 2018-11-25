import { InputItem } from 'antd-mobile-rn';
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

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

// TODO: FOrmik 적용

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
        <InputItem
          clear={true}
          error={true}
          value={"Hello"}
          onChange={(value: any) => {
            this.setState({
              value,
            });
          }}
          extra="元"
          placeholder="有标签"
        >
          输入框
        </InputItem>
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
