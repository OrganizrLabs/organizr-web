// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { Button } from 'semantic-ui-react';
import Text from 'components/Text';
import { colors } from 'constants/styles';
import styled from 'styled-components';

type Props = {
  title: string,
  onClose: Function,
};

const ModalHeader = ({ title, onClose }: Props) =>
  <Header p={1}>
    <Flex auto>
      <Text size="large">
        {title}
      </Text>
    </Flex>
    <Button icon="close" onClick={onClose} />
  </Header>;

const Header = styled(Flex)`
  background: ${colors.lightgray};
  align-items: center;
`;

export { ModalHeader };
export default ModalHeader;
