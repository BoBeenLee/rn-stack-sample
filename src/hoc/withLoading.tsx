import hoistNonReactStatic from "hoist-non-react-statics";
import { Observer } from "mobx-react";
import React, { Component } from "react";
import styled from "styled-components/native";

import Loading from "../components/Loading";

interface IProps {
  componentId: string;
}

interface IStates {
  isLoading: boolean;
  isShowLoading: boolean;
}

export interface ILoadingProps {
  wrapperLoading: (func: any, isShowLoading: boolean) => any;
  isLoading: boolean;
}

const OverlayView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  opacity: 0.4;
  z-index: 99;
`;

const withLoading = <P extends object>(
  TargetComponent: React.ComponentType<P & ILoadingProps>
): any => {
  const WithLoading = class extends Component<P & IProps, IStates> {
    public state = {
      isLoading: false,
      isShowLoading: true
    };

    public render() {
      return (
        <React.Fragment>
          <TargetComponent
            {...this.props}
            wrapperLoading={this.wrapperLoading}
            isLoading={this.state.isLoading}
          />
          <Observer>
            {() => {
              return (
                <React.Fragment>
                  {this.isLoadingShow() && <OverlayView />}
                  {this.isLoadingShow() && <Loading />}
                </React.Fragment>
              );
            }}
          </Observer>
        </React.Fragment>
      );
    }

    private wrapperLoading = (func: any, isShowLoading: boolean) => {
      let isLocalLoading = false;
      return async (...args: any[]) => {
        if (isLocalLoading) {
          return;
        }
        this.setState({
          isLoading: true,
          isShowLoading
        });
        isLocalLoading = true;
        try {
          return await func(...args);
        } finally {
          isLocalLoading = false;
          this.setState({
            isLoading: false,
            isShowLoading
          });
        }
      };
    };

    private isLoadingShow = () => {
      const { isLoading: isLoadingState, isShowLoading } = this.state;
      return isLoadingState && isShowLoading;
    };
  };
  hoistNonReactStatic(WithLoading, TargetComponent as any);
  return WithLoading;
};

export default withLoading;
