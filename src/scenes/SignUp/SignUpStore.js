import { action, extendObservable } from 'mobx';
import { type RouterHistory } from 'react-router-dom';
import UserStore from 'stores/UserStore';

class SignUpStore {
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
  signUpUser = async (user: UserStore, history: RouterHistory): Promise<*> => {
    try {
      await user.signUp({
        name: this.name,
        email: this.email,
        password: this.password
      });
      const res = await user.login({
        email: this.email,
        password: this.password
      });
      if (res.error) {
        console.error(res.error);
      } else {
        history.push('/kolas');
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export default SignUpStore;
