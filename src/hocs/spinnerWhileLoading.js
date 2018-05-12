// @flow
import * as React from 'react';
import { branch, renderComponent } from 'recompose';
import { Spin } from 'antd';
import { Flex } from 'reflexbox';

const Loading = () =>
  <Flex auto justify="center" align="center">
    <Spin />
  </Flex>;

export default isLoading =>
  branch(
    isLoading,
    renderComponent(Loading) // `Spinner` is a React component
  );
