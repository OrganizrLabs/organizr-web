// @flow
import * as React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  location: Object
};

const Footer = ({ location }: Props) => {
  const FooterLink = props =>
    <StyledLink active={location.pathname === props.to} {...props}>
      {props.children}
    </StyledLink>;
  return (
    <FooterLinks>
      <Breadcrumb>
        <Breadcrumb.Item>
          <FooterLink to="/">Home</FooterLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FooterLink to="/timeline">Timeline</FooterLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FooterLink to="/media">Media</FooterLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    </FooterLinks>
  );
};

const StyledLink = styled(Link)`
  ${({ active }) => active && `font-weight: bold;`}
`;

const FooterLinks = styled(Flex)`
  margin: 0 30px;
  padding: 15px 0;
  border-top: 1px solid #d6d6d6;
`;

export default withRouter(Footer);
