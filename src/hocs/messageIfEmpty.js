// @flow
import * as React from 'react';
import { branch, renderComponent } from 'recompose';
import { Flex } from 'reflexbox';

type Props = {
  message: string
};

const Loading = ({ message }: Props) =>
  <Flex auto justify="center" align="center">
    <h3>
      {message}
    </h3>
  </Flex>;

export default (isEmpty: Function, message: string) =>
  branch(
    isEmpty,
    renderComponent(() => <Loading message={message} />) // `Spinner` is a React component
  );
