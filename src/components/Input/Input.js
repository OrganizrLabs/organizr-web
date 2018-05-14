// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

type Props = {
  onChange: Function,
  value: string,
  icon?: string,
  size?: 'normal' | 'large',
  label?: string,
  flat?: boolean,
  onEnter?: Function,
  action?: React.Node,
  placeholder?: string,
  primaryColor: string,
  className?: string
};

const fontSizes = {
  normal: '14px',
  large: '20px'
};

class Input extends React.Component<Props> {
  handleChange = (event: SyntheticEvent<*>) => {
    const { target } = event;
    if (!(target instanceof window.HTMLInputElement)) return;
    this.props.onChange(target.value);
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
      label,
      flat,
      placeholder,
      primaryColor,
      size = 'normal',
      className
    } = this.props;
    return (
      <Flex column className={className}>
        {label &&
          <Label primaryColor={primaryColor}>
            {label}
          </Label>}
        <InputContainer className="input-container">
          {icon &&
            <IconContainer
              justify="center"
              align="center"
              className="input-icon__container"
            >
              <StyledIcon type={icon} size={size} className="input-icon" />
            </IconContainer>}
          <StyledInput
            type="text"
            hasIcon={!!icon}
            size={size}
            flat={flat}
            onKeyPress={this.handleKeyPress}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            className="input-instance"
          />
          {action &&
            <ActionContainer className="input-action__container">
              {action}
            </ActionContainer>}
        </InputContainer>
      </Flex>
    );
  }
}

const Label = styled.h4`color: ${({ primaryColor }) => primaryColor};`;

const ActionContainer = styled(Flex)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const IconContainer = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const StyledIcon = styled(Icon)`
  font-size: 19px;
  color: gray;
  padding: ${({ size }) => (size === 'large' ? '0 8px' : '0 5px')};
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 8px;
  border: ${({ flat }) => (flat ? '1px solid #d9d9d9' : 'none')};
  font-family: Roboto;
  color: black;
  font-size: ${({ size }) => fontSizes[size]};
  box-shadow: ${({ flat }) =>
    !flat ? 'rgba(0, 0, 0, 0.1) 0px 1px 2px' : 'none'};
  ${({ hasIcon, size }) =>
    hasIcon &&
    (size === 'large' ? `padding-left: 40px;` : `padding-left: 30px;`)};
`;

const mapStateToProps = ({ app: { primaryColor } }) => ({ primaryColor });

export default connect(mapStateToProps)(Input);
