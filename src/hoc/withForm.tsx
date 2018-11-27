import { withFormik, WithFormikConfig } from "formik";
import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";

const withForm = <IProps, IFormStates>(
  options: WithFormikConfig<IProps, IFormStates>
) => <P extends object>(TargetComponent: React.ComponentType<P>): any => {
  const WithForm = withFormik(options)(TargetComponent as any);
  hoistNonReactStatic(WithForm, TargetComponent as any);
  return WithForm;
};

export default withForm;
