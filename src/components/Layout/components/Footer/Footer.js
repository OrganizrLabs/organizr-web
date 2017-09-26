// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
  history: RouterHistory
};

class Footer extends React.Component<{}> {
  static defaultProps: Props;
  handleItemClick = () => {
    console.log('Item clicked');
    // this.props.history.push('/dashboard');
  };

  render() {
    return <ApplicationFooter />;
  }
}

const ApplicationFooter = styled(Menu)`
  border-radius: 0 !important;  
`;

export { Footer };
export default withRouter(Footer);
