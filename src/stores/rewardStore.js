import { observable, action, computed } from 'mobx';
import { MineCoinKey } from 'constants/common';
import { getData, setData } from 'utils/sensitiveInfo';

class RewardStore {
  @observable mineCoin = 0;

  @action async getCoinLocalStorage() {
    const coin = await getData(MineCoinKey);
    this.mineCoin = parseInt(coin);
  }

  @action async setMineCoin(amount) {
    const value = this.mineCoin + amount;
    console.log(
      'file: rewardStore.js ~ line 15 ~ @actionsetMineCoin ~ value',
      value,
    );
    await setData(MineCoinKey, value);
    this.getCoinLocalStorage();
  }

  @computed get MineCoin() {
    return this.mineCoin;
  }
}

const rewardStore = new RewardStore();
export default rewardStore;
