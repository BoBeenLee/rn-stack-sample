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

import { Title, TodoCard, Button } from "../components";
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

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled(Title)`
  flex: 1;
`;

const HeaderHistory = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Undo = styled(Button)`
  margin-right: 8px;
`;

const Redo = styled(Button)`
  margin-right: 15px;
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
        <Header>
          <HeaderTitle>Todo</HeaderTitle>
          <HeaderHistory>
            <Undo type="default" onPress={this.onUndo}>Undo</Undo>
            <Redo type="default" onPress={this.onRedo}>Redo</Redo>
          </HeaderHistory>
        </Header>
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

  private onUndo = () => {
    this.props.todoStore.undo();
  }

  private onRedo = () => {
    this.props.todoStore.redo();
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
