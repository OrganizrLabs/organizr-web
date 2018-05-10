// @flow
import * as React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { scenes } from 'constants/app';
import { type Theme } from 'types/Theme';

type Props = {
  location: Object,
  theme: Theme,
  themeName: string
};

const Footer = ({ location, theme, themeName }: Props) => {
  const FooterLink = props =>
    <StyledLink active={location.pathname === props.to} {...props}>
      {props.children}
    </StyledLink>;
  return (
    <FooterLinks theme={theme} themeName={themeName}>
      <Breadcrumb>
        {scenes.map((scene, i) =>
          <Breadcrumb.Item key={i}>
            <FooterLink to={scene.path}>
              {scene.name}
            </FooterLink>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </FooterLinks>
  );
};

const StyledLink = styled(Link)`
  ${({ active }) => active && `font-weight: bold;`}
`;

const FooterLinks = styled(Flex)`
  padding: 15px 30px;
  background: ${({ themeName, theme }) =>
    themeName === 'light' ? '#f0f2f5' : theme.background};
  border-top: 1px solid #d6d6d6;
`;

export default withRouter(Footer);
