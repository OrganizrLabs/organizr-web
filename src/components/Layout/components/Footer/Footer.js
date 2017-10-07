// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'antd';
import { type RouterHistory } from 'react-router-dom';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  history: RouterHistory
};

class Footer extends React.Component<Props> {
  render() {
    const { history } = this.props;
    const goToDashoard = () => history.push('/dashboard');
    const goToSettings = () => history.push('/settings');
    return (
      <FooterLinks>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={goToDashoard}>Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={goToSettings}>Settings</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="#">Somewhere else</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </FooterLinks>
    );
  }
}

const FooterLinks = styled(Flex)`
  margin: 0 30px;
`;

export { Footer };
export default withRouter(Footer);
