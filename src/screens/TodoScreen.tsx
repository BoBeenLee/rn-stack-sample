import { FormikProps } from "formik";
import { InputItem } from "antd-mobile-rn";
import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import {
  FlatList,
  FlatListProps,
  Text,
  ListRenderItemInfo
} from "react-native";
import styled from "styled-components/native";

import { Title } from "../components";
import { IStores } from "../stores/RootStore";
import { ITodo } from "../stores/Todo";
import { ITodoStore, getTodoStore } from "../stores/TodoStore";
import withForm from "../hoc/withForm";

interface IInject {
  todoStore: ITodoStore;
}

interface IProps extends IInject {
  componentId: string;
}

interface IFormStates {
  todoText: string;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TodoList = styled<FlatListProps<ITodo>>(FlatList).attrs({
  contentContainerStyle: {
    marginTop: 10
  }
})``;

const DEFAULT_TODO_VALUES = {
  todoText: ""
};

@inject(
  (stores: IStores): IInject => ({
    todoStore: getTodoStore(stores)
  })
)
@observer
@withForm<IProps, IFormStates>({
  handleSubmit: (values, { props }) => {
    const { addTodo } = props.todoStore;
    addTodo(values.todoText);
  },
  mapPropsToValues: () => {
    return DEFAULT_TODO_VALUES;
  }
})
class TodoScreen extends Component<IProps & FormikProps<IFormStates>> {
  public render() {
    const { todoText } = this.props.values;
    const { todosByOrderDESC } = this.props.todoStore;
    return (
      <Container>
        <Title>Todo</Title>
        <InputItem
          value={todoText}
          onChange={this.onTodoTextChange}
          extra="추가"
          onExtraClick={this.submit}
          placeholder="텍스트를 입력하세요"
        >
          할 것
        </InputItem>
        <TodoList
          data={todosByOrderDESC}
          keyExtractor={this.todoKeyExtractor}
          renderItem={this.renderTodoItem}
        />
      </Container>
    );
  }

  private onTodoTextChange = (text: string) => {
    const { setFieldValue } = this.props;
    setFieldValue("todoText", text);
  };

  private todoKeyExtractor = (item: ITodo, __: number) => {
    return `todo${item.id}`;
  };

  private renderTodoItem = (props: ListRenderItemInfo<ITodo>) => {
    const { id, name, order } = props.item;
    return (
      <Text>
        {order} - {name}
      </Text>
    );
  };

  private submit = () => {
    const { submitForm, setFieldValue } = this.props;
    submitForm();
    setFieldValue("todoText", "");
  };
}

export default TodoScreen;
