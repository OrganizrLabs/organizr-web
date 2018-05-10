// @flow
import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

type Props = {
  onChange: Function,
  value: string,
  icon?: string,
  size?: 'normal' | 'large',
  onEnter?: Function,
  action?: React.Node,
  placeholder?: string,
  className?: string
};

const fontSizes = {
  normal: '14px',
  large: '20px'
};

class TextArea extends React.Component<Props> {
  handleChange = (e: Event) => {
    // $FlowIssue
    this.props.onChange(e.target.value);
  };

  handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter' && !!this.props.onEnter) {
      this.props.onEnter();
    }
  };

  render() {
    const {
      value,
      icon,
      action,
      placeholder,
      size = 'normal',
      className
    } = this.props;
    return (
      <InputContainer className={className}>
        <StyledTextArea
          hasIcon={!!icon}
          size={size}
          onKeyPress={this.handleKeyPress}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          className="textarea-instance"
        />
        {action &&
          <ActionContainer className="textarea-action__container">
            {action}
          </ActionContainer>}
      </InputContainer>
    );
  }
}

const ActionContainer = styled(Flex)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const InputContainer = styled.div`position: relative;`;

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  padding: 8px;
  border: none;
  font-family: Roboto;
  color: black;
  font-size: ${({ size }) => fontSizes[size]};
  box-shadow: ${({ shadow }) => shadow};
  ${({ hasIcon, size }) =>
    hasIcon &&
    (size === 'large' ? `padding-left: 40px;` : `padding-left: 30px;`)};
`;

export default TextArea;
