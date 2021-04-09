import { observable, action, computed } from 'mobx';
import {
  MineCoinKey,
  WaitingTimeWatchAdKey,
  CalculationKey,
} from 'constants/common';
import { getData, setData } from 'utils/sensitiveInfo';

class RewardStore {
  @observable mineCoin = 0;
  @observable timeToReward = 0;
  @observable isSubtractAvailable = 0;
  @observable isMultiAvailable = 0;
  @observable isDivideAvailable = 0;
  countTime = 60;

  @action async getCoinLocalStorage() {
    const coin = await getData(MineCoinKey);
    if (coin || coin === 0) {
      this.mineCoin = parseInt(coin);
    }
  }

  @action async getModeLocalStorage() {
    const SUBTRACTION = await getData(CalculationKey.SUBTRACTION);
    const MULTIPLICATION = await getData(CalculationKey.MULTIPLICATION);
    const DIVISION = await getData(CalculationKey.DIVISION);
    if (SUBTRACTION) {
      this.isSubtractAvailable = parseInt(SUBTRACTION);
    }
    if (MULTIPLICATION) {
      this.isMultiAvailable = parseInt(MULTIPLICATION);
    }
    if (DIVISION) {
      this.isDivideAvailable = parseInt(DIVISION);
    }
  }

  @action async setMineCoin(amount) {
    const value = this.mineCoin + amount;
    await setData(MineCoinKey, value);
    this.getCoinLocalStorage();
  }

  @action async unlockMode(keyName) {
    await setData(keyName, 1);
    this.getModeLocalStorage();
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
  @computed get IsSubtractAvailable() {
    return this.isSubtractAvailable;
  }
  @computed get IsMultiAvailable() {
    return this.isMultiAvailable;
  }
  @computed get IsDivideAvailable() {
    return this.isDivideAvailable;
  }
}

const rewardStore = new RewardStore();
export default rewardStore;
