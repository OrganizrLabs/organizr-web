// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTheme } from 'store/app/appSelectors';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { type Theme } from 'types/Theme';

type Props = {
  /** Name of the panel */
  title: string,
  theme: Theme,
  primaryColor: string,
  className?: string,
  children?: React.Node,
  actions?: React.Node
};

const DashboardPanel = ({
  title,
  children,
  primaryColor,
  className,
  actions,
  ...otherProps
}: Props) => {
  return (
    <Panel column className={className} {...otherProps}>
      <Header
        align="center"
        justify="space-between"
        className="dashboardpanel-header"
        primaryColor={primaryColor}
      >
        <h3 className="dashboardpanel-header__title">
          {title}
        </h3>
        <Flex align="center">
          {actions}
        </Flex>
      </Header>
      <Content auto className="dashboardpanel-content">
        {children}
      </Content>
    </Panel>
  );
};

const Content = styled(Flex)`
  margin-top: 10px;
`;

const Header = styled(Flex)`
  width: 100%;
  height: 40px;
  min-height: 40px;
  border-bottom: 1px solid ${({ primaryColor }) => primaryColor};
`;

const Panel = styled(Flex)`
  padding: 10px;
  background: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const mapStateToProps = ({ app, app: { primaryColor } }) => ({
  theme: getTheme(app),
  primaryColor
});

export default connect(mapStateToProps)(DashboardPanel);
