// @flow
import { observable, action } from 'mobx';

class MediaStore {
  @observable activeMediaId: string;
  @observable modalVisible: boolean = false;
  // Tags that filter the search
  @observable tagFilters: Array<string> = [];
  @observable typeSelection: string = 'all';
  @observable searchValue: string = '';

  @action
  addTagFilter = (tag: string): void => {
    this.tagFilters.push(tag);
  };

  @action
  removeTagFilter = (tag: string): void => {
    const index = this.tagFilters.indexOf(tag);
    if (index > -1) {
      this.tagFilters.splice(index, 1);
    }
  };

  @action
  resetFilters = (): void => {
    this.tagFilters = [];
  };

  @action
  setSearchValue = (value: string): void => {
    this.searchValue = value;
  };

  @action
  showModal = (id: string): void => {
    this.activeMediaId = id;
    this.modalVisible = true;
  };

  @action
  hideModal = (): void => {
    this.modalVisible = false;
  };

  @action
  changeType = (type: string): void => {
    this.typeSelection = type;
  };
}

export default MediaStore;
