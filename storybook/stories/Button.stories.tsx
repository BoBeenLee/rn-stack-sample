import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Button } from "../../src/components";

storiesOf("Button", module)
  .add("Normal Button", () => <Button type="default">Default</Button>)
  .add("Primary Button", () => <Button type="primary">Perimary</Button>);
