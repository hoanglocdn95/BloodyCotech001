import { observable, action, computed } from 'mobx';

class RewardStore {
  @observable mineCoin = 0;
}

const rewardStore = new RewardStore();
export default rewardStore;
