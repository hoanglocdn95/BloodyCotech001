import { observable, action, computed } from 'mobx';

class BattleStore {
  @observable firstParameter = 0;
  @observable secondParameter = 0;
  @observable player1 = {
    point: 0,
  };
  @observable player2 = {
    point: 0,
  };

  @action setFirstParameter(item) {
    this.firstParameter = item;
  }
  @action setSecondParameter(item) {
    this.secondParameter = item;
  }

  @action setPoint(point, player) {
    this[`player${player}`].point = point;
  }

  @computed get FirstParameter() {
    return this.firstParameter;
  }
  @computed get SecondParameter() {
    return this.secondParameter;
  }

  @action reset() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.player1 = {
      point: 0,
    };
    this.player2 = {
      point: 0,
    };
  }

  randomNumber = (to, from) => {
    return Math.floor(Math.random() * from) + to;
  };

  calculateResult = () => {
    const isTrue = Math.floor(Math.random() * 4);
    if (isTrue === 0) {
      return this.firstParameter + this.secondParameter;
    }
    const isBigger = Math.floor(Math.random() * 4);
    let resultFalse = 0;
    if (isBigger === 0) {
      resultFalse =
        this.firstParameter +
        this.secondParameter +
        Math.floor(Math.random() * 2);
    } else {
      resultFalse =
        this.firstParameter +
        this.secondParameter -
        Math.floor(Math.random() * 2);
    }
    return resultFalse < 0 ? 0 : resultFalse;
  };
}

const battleStore = new BattleStore();
export default battleStore;
