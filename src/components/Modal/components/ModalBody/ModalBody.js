// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { type Theme } from 'types/Theme';
import { getTheme } from 'store/app/appSelectors';

type Props = {
  className?: string,
  children: React.Node,
  theme: Theme
};

const ModalBody = ({ className, children, theme }: Props) =>
  <Body column p={2} className={className} theme={theme}>
    {children}
  </Body>;

const Body = styled(Flex)`
  background: ${({ theme }) => theme.background};
`;

const mapStateToProps = ({ app }) => ({
  theme: getTheme(app)
});

export default connect(mapStateToProps)(ModalBody);
