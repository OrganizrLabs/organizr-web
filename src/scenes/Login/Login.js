// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';
import { colors } from 'constants/styles';
import LoginStore from './LoginStore';
import UserStore from 'stores/UserStore';
import banner from 'assets/banner.jpg';

const FormItem = Form.Item;
const store = new LoginStore();

type Props = {
  history: RouterHistory,
  form: Object,
  user: UserStore
};

@observer
class Login extends React.Component<Props> {
  signUp = () => {
    this.props.history.push('/signup');
  };

  handleSubmit = (e: Object) => {
    const { user, history } = this.props;
    e.preventDefault();
    e.stopPropagation();
    store.loginUser(user, history);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FullHeight auto justify="center">
        <Banner justify="center" align="center" auto>
          <BannerImage src={banner} alt="banner" />
          <BannerTextContainer>
            <BannerText>Welcome to AtLarge</BannerText>
          </BannerTextContainer>
        </Banner>
        <LoginForm onSubmit={this.handleSubmit}>
          <UserIcon type="user" style={{ fontSize: 60 }} />
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Flex column>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
              <Flex>
                New to us?
                <CreateAccountLink onClick={this.signUp}>
                  Create an account
                </CreateAccountLink>
              </Flex>
            </Flex>
          </FormItem>
        </LoginForm>
      </FullHeight>
    );
  }
}

const UserIcon = styled(Icon)`
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  object-fit: cover;
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  filter: blur(3px);
`;

const BannerTextContainer = styled(Flex)`
  position: absolute;
`;

const BannerText = styled.h1`
  color: #fff;
  font-size: 5rem;
`;

const CreateAccountLink = styled.a`margin-left: 6px;`;

const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  min-width: 300px;
`;

const FullHeight = styled(Flex)`
  min-height: 100vh;
`;

const Banner = styled(Flex)`
  background-color: ${colors.teal};
  overflow: hidden
  position: relative;
`;

export { Login };
export default inject('user')(
  withRouter(
    Form.create({
      onFieldsChange: (_, fields) => {
        store.updateFields(fields);
      }
    })(Login)
  )
);
