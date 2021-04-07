import { observable, action, computed } from 'mobx';
import addModule from 'module/addModule';
import subtractModule from 'module/subtractModule';
import multiModule from 'module/multiModule';
import divideModule from 'module/divideModule';
import { TypeEquation } from 'constants/common';

class BattleStore {
  @observable firstParameter = 0;
  @observable secondParameter = 0;
  @observable resultParameter = 0;
  @observable correctResult = 0;
  @observable moduleSelected = addModule;
  @observable operator = TypeEquation.ADDITION;
  @observable player1 = {
    point: 0,
  };
  @observable player2 = {
    point: 0,
  };

  @action getValue() {
    switch (this.operator) {
      case TypeEquation.ADDITION:
        this.moduleSelected = addModule;
        break;
      case TypeEquation.SUBTRACTION:
        this.moduleSelected = subtractModule;
        break;
      case TypeEquation.MULTIPLICATION:
        this.moduleSelected = multiModule;
        break;
      case TypeEquation.DIVISION:
        this.moduleSelected = divideModule;
        break;
      default:
        this.moduleSelected = addModule;
        break;
    }
    this.moduleSelected.init(1, 9);
    const {
      firstParameter,
      secondParameter,
      resultParameter,
      correctResult,
    } = this.moduleSelected.returnValue();
    this.firstParameter = firstParameter;
    this.secondParameter = secondParameter;
    this.resultParameter = resultParameter;
    this.correctResult = correctResult;
  }

  @action setPoint(point, player) {
    this[`player${player}`].point = point;
  }

  @action reset() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.resultParameter = 0;
    this.correctResult = 0;
    this.player1 = {
      point: 0,
    };
    this.player2 = {
      point: 0,
    };
  }

  @computed get FirstParameter() {
    return this.firstParameter;
  }

  @computed get SecondParameter() {
    return this.secondParameter;
  }

  @computed get ResultParameter() {
    return this.resultParameter;
  }

  @computed get CorrectResult() {
    return this.correctResult;
  }

  @computed get TrueAnswer() {
    return this.moduleSelected.trueAnswer;
  }

  @computed get Operator() {
    return this.operator;
  }
}

const battleStore = new BattleStore();
export default battleStore;
