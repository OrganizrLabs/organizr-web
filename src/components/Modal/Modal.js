// @flow
import * as React from 'react';
import ReactModal from 'react-modal';
import ModalHeader from './components/ModalHeader';

type Props = {
  children: React.Node,
  onClose: Function,
};

const modalStyles = () => ({
  overlay: {
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 212, 212, 0.5)',
  },
  content: {
    position: 'static',
    maxWidth: '600px',
    margin: 'auto',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 36px 14px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '0',
  },
});

const Modal = ({ children, onClose, ...otherProps }: Props) => {
  const style = modalStyles();
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      closeTimeoutMS={5}
      style={style}
      contentLabel="Modal"
      {...otherProps}
    >
      {React.Children.map(children, child => {
        if (child.type === ModalHeader) {
          // $FlowIssue
          return React.cloneElement(child, { onClose });
        }
        return child;
      })}
    </ReactModal>
  );
};

export { Modal };
export default Modal;
