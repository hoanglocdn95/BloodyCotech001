import { observable, action, computed } from 'mobx';

class RewardStore {
  @observable mineCoin = 0;

  @action setMineCoin(amount) {
    this.mineCoin = parseInt(amount);
  }
}

const rewardStore = new RewardStore();
export default rewardStore;
