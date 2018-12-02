import { FormikProps } from "formik";
import { InputItem } from "antd-mobile-rn";
import React, { Component } from "react";
import { inject, observer, Observer } from "mobx-react/native";
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo
} from "react-native";
import styled from "styled-components/native";

import { Title, TodoCard } from "../components";
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
    marginTop: 15,
    paddingHorizontal: 15
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
  handleSubmit: (values, { props, setFieldValue }) => {
    const { addTodo } = props.todoStore;
    addTodo(values.todoText);
    setFieldValue("todoText", "");
  },
  mapPropsToValues: () => {
    return DEFAULT_TODO_VALUES;
  }
})
class TodoScreen extends Component<IProps & FormikProps<IFormStates>> {
  public render() {
    const { todoText } = this.props.values;
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
        <Observer>{() => {
          const { todosByOrderDESC } = this.props.todoStore;
          return (<TodoList
            data={todosByOrderDESC}
            keyExtractor={this.todoKeyExtractor}
            renderItem={this.renderTodoItem}
          />);
        }}</Observer>

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
    const { name, order } = props.item;
    return (
      <TodoCard order={order} content={name} />
    );
  };

  private submit = () => {
    const { submitForm } = this.props;
    submitForm();
  };
}

export default TodoScreen;
