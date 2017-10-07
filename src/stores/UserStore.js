import { observable, action } from 'mobx';
import { postRequest } from 'helpers/api';

class UserStore {
  @observable loggedIn: boolean = false;
  @observable name: string = 'Default User';
  @observable email: string = 'user@example.com';

  @action
  signUp = async (options: {
    name: string,
    email: string,
    password: string
  }): Promise<*> => {
    return new Promise(async (resolve, reject) => {
      const { name, email, password } = options;
      if (!name || !email || !password) reject('Invalid params');
      try {
        const res = await postRequest('/auth/new', options, { skipAuth: true });
        // Handle errors in the standard way
        if (res.error) reject(res.error);
        else resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  login = async (options: { email: string, password: string }): Promise<*> => {
    return new Promise(async (resolve, reject) => {
      const { email, password } = options;
      if (!email || !password) reject('Invalid params');
      try {
        const res = await postRequest('/auth/login', options, {
          skipAuth: true
        });
        // Handle errors in the standard way
        if (res.error) reject(res.error);
        else {
          sessionStorage.setItem('jwtToken', res.data.token);
          this.loggedIn = true;
          this.name = res.data.user.name;
          this.email = res.data.user.email;
          resolve(res);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  @action
  logout = async (): Promise<*> => {
    if (!this.loggedIn) {
      console.error('User is not logged in');
    }
    sessionStorage.setItem('jwtToken', '');
    this.loggedIn = false;
    this.name = '';
    this.email = '';
    window.location = '/login';
  };
}

export default UserStore;
