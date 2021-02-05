import { observable, action, computed } from 'mobx';

class CounterStore {
  @observable isReset = false;

  @action reset() {
    this.isReset = !this.isReset;
  }
  @computed get IsReset() {
    return this.isReset;
  }
}

const counterStore = new CounterStore();
export default counterStore;
