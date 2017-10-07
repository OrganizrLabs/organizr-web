import { action, extendObservable } from 'mobx';

class LoginStore {
  @action
  updateFields = (fields): void => {
    let fieldsToUpdate = {};
    for (let key in fields) {
      if (!fields[key].errors) {
        fieldsToUpdate[fields[key].name] = fields[key].value;
      }
    }
    extendObservable(this, fieldsToUpdate);
  };

  @action
  loginUser = async (user: UserStore, history: RouterHistory): Promise<*> => {
    try {
      const res = await user.login({
        name: this.name,
        email: this.email,
        password: this.password
      });
      if (res.error) {
        console.error(res.error);
      } else {
        history.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export default LoginStore;
