// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';

type Props = {
  className: string,
  children: React.Node,
};

const ModalBody = ({ className, children }: Props) =>
  <Flex p={2} className={className}>
    {children}
  </Flex>;

export { ModalBody };
export default ModalBody;
