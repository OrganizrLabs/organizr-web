// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';
import { type RouterHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { colors } from 'constants/styles';
import UserStore from 'stores/UserStore';
import SignUpStore from './SignUpStore';
import banner from 'assets/banner.jpg';

const FormItem = Form.Item;
// instantiate outside of component context because rc-form is sketch af
const store = new SignUpStore();

type Props = {
  form: Object,
  user: UserStore,
  history: RouterHistory
};

@observer
class SignUp extends React.Component<Props> {
  store: SignUpStore;

  handleSubmit = (e: Object) => {
    const { user, history } = this.props;
    e.preventDefault();
    e.stopPropagation();
    store.signUpUser(user, history);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FullHeight auto justify="center">
        <Banner auto justify="center" align="center">
          <BannerImage src={banner} alt="banner" />
          <BannerTextContainer>
            <BannerText>Welcome to AtLarge</BannerText>
          </BannerTextContainer>
        </Banner>
        <SignUpForm onSubmit={this.handleSubmit}>
          <UserIcon type="user-add" style={{ fontSize: 60 }} />
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Name"
              />
            )}
          </FormItem>
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
                Register
              </Button>
            </Flex>
          </FormItem>
        </SignUpForm>
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

const SignUpForm = styled(Form)`
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
`;

export { SignUp };
export default inject('user')(
  withRouter(
    Form.create({
      onFieldsChange: (_, fields) => {
        store.updateFields(fields);
      }
    })(SignUp)
  )
);
