import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Welcome', module).add('to Storybook', () => <Text>Hello World</Text>);
