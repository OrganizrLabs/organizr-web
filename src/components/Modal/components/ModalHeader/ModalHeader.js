// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { connect } from 'react-redux';
import Button from 'components/Button';
import styled from 'styled-components';

type Props = {
  /** Header title */
  title: string,
  /** Function that is called when the modal is closed */
  onClose?: Function,
  /** Global store inject to handle theme */
  primaryColor: string
};

/**
 * Header for the modal component. Note that this is actually cloned
 * in `<Modal />` and passed the onClose prop. This is a good example of
 * handling React Children in case it needs to be done for other components
 */
const ModalHeader = ({ title, onClose, primaryColor }: Props) => {
  return (
    <Header primary={primaryColor}>
      <Flex auto>
        <ModalTitle size="large">
          {title}
        </ModalTitle>
      </Flex>
      <CloseButton icon="close" onClick={onClose} />
    </Header>
  );
};

const CloseButton = styled(Button)`
  background: none;
  border: none;
  box-shadow: none;
  color: #fff;
  &:hover {
    background: none;
    border: none;
    box-shadow: none;
  }
  &:active {
    background: none;
    border: none;
    box-shadow: none;
  }
  &:focus {
    background: none;
    border: none;
    box-shadow: none;
  }
`;

const ModalTitle = styled.h2`color: #fff;`;

const Header = styled(Flex)`
  background: ${({ primary }) => primary};
  align-items: center;
  padding: 8px 15px;
  color: #fff;
`;

const mapStateToProps = ({ app: { primaryColor } }) => ({ primaryColor });

export default connect(mapStateToProps)(ModalHeader);
