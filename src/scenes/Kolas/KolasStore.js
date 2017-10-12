// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class KolasStore {
  @observable teams: Object[] = [];

  @action
  getTeams = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/teams', {});
      if (res.data) {
        this.teams = res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default KolasStore;
