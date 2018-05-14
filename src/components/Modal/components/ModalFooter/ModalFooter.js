// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { type Theme as ThemeType } from 'types/Theme';
import { getTheme } from 'store/app/appSelectors';

type Props = {
  children: React.Node,
  theme: ThemeType
};

const ModalFooter = ({ children, theme }: Props) =>
  <Footer justify="flex-end" theme={theme}>
    {children}
  </Footer>;

const Footer = styled(Flex)`
  background: ${({ theme }) => theme.background};
  padding: 8px 15px;
`;

const mapStateToProps = ({ app }) => ({ theme: getTheme(app) });

export { ModalFooter };
export default connect(mapStateToProps)(ModalFooter);
