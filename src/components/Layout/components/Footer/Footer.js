// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Flex } from 'reflexbox';

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
    return <Flex>Footer</Flex>;
  }
}

export { Footer };
export default withRouter(Footer);
