import { observable, action, computed } from 'mobx';
import { MineCoinKey, WaitingTimeWatchAdKey } from 'constants/common';
import { getData, setData } from 'utils/sensitiveInfo';

class RewardStore {
  @observable mineCoin = 0;
  @observable timeToReward = 0;
  countTime = 60;

  @action async getCoinLocalStorage() {
    const coin = await getData(MineCoinKey);
    if (coin || coin === 0) {
      this.mineCoin = parseInt(coin);
    }
  }

  @action async setMineCoin(amount) {
    const value = this.mineCoin + amount;
    await setData(MineCoinKey, value);
    this.getCoinLocalStorage();
  }

  @action async getTimeToRewardLocalStorage() {
    const time = await getData(WaitingTimeWatchAdKey);
    this.timeToReward = parseInt(time);
  }

  @action async setTimeToReward(resetTime) {
    if (resetTime && resetTime === 0) {
      await setData(WaitingTimeWatchAdKey, 0);
    } else {
      const timeEnd = Math.floor(Date.now() / 1000) + this.countTime;
      await setData(WaitingTimeWatchAdKey, timeEnd);
    }
    this.getTimeToRewardLocalStorage();
  }

  @computed get MineCoin() {
    return this.mineCoin;
  }

  @computed get TimeToReward() {
    return this.timeToReward;
  }
}

const rewardStore = new RewardStore();
export default rewardStore;
