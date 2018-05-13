// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import ModalHeader from './components/ModalHeader';
import { type Theme } from 'types/Theme';

type Props = {
  children: React.Node,
  theme: Theme
};

const modalStyles = (isMobile: boolean, theme: Object) => ({
  overlay: {
    position: 'fixed',
    display: 'flex',
    zIndex: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 212, 212, 0.5)'
  },
  content: {
    position: 'static',
    overflow: 'scroll',
    width: isMobile ? '100%' : '750px',
    margin: 'auto',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 36px 14px',
    color: theme.color,
    background: theme.background,
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '0'
  }
});

const Modal = ({ children, onClose, theme, ...otherProps }: Props) => {
  const style = modalStyles(false, theme);
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

const mapStateToProps = ({ app: { theme } }) => ({ theme });

export default connect(mapStateToProps)(Modal);
