// @flow
import * as React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { scenes } from 'constants/app';
import { type Theme } from 'types/Theme';
import { getTheme } from 'store/app/appSelectors';

type Props = {
  location: Object,
  theme: Theme,
  themeName: string
};

const Footer = ({ location, theme, themeName }: Props) => {
  const FooterLink = props =>
    <StyledLink
      active={location.pathname === props.to}
      theme={theme}
      {...props}
    >
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
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')}
  color: ${({ theme }) => theme.color} !important;
`;

const FooterLinks = styled(Flex)`
  padding: 15px 30px;
  background: ${({ themeName, theme }) =>
    themeName === 'light' ? '#f0f2f5' : theme.background};
  border-top: 1px solid #d6d6d6;
`;

const mapStateToProps = ({ app }) => ({
  theme: getTheme(app),
  themeName: app.theme
});

export default compose(connect(mapStateToProps), withRouter)(Footer);
