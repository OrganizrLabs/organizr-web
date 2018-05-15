// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import Layout from 'components/Layout';
import { loginUser } from 'store/user/userActions';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';

type Props = {
  firebase: {
    login: Function
  },
  auth: Object,
  loginUser: void => void,
  // logged in state, stored locally in redux
  loggedIn: boolean
};

const enhanceLogin = spinnerWhileLoading(({ auth }) => !isLoaded(auth));

const Login = enhanceLogin(({ firebase, auth }) => {
  return isEmpty(auth)
    ? <LoginButtonContainer auto justify="center">
        <GoogleButton
          onClick={() =>
            firebase
              .login({ provider: 'google', type: 'popup' })
              .then(loginUser)}
        >
          Login With Google
        </GoogleButton>
      </LoginButtonContainer>
    : <Redirect to="/dashboard" />;
});

export const LoginPage = (props: Props) => {
  return (
    <Layout>
      <Login {...props} />
    </Layout>
  );
};

const LoginButtonContainer = styled(Flex)`
  padding-top: 50px;
`;

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
});

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps)
)(LoginPage);
