import { observable, action, computed } from 'mobx';
import addModule from 'module/addModule';
import subtractModule from 'module/subtractModule';
import multiModule from 'module/multiModule';
import divideModule from 'module/divideModule';
import { TypeEquation } from 'constants/common';

class PracticeStore {
  @observable firstParameter = 0;
  @observable secondParameter = 0;
  @observable resultParameter = 0;
  @observable correctResult = 0;
  @observable point = 0;
  @observable playTime = 0;
  @observable thresholdPoint = 0;
  @observable moduleSelected = addModule;
  @observable operator = TypeEquation.ADDITION;

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

  @action setPoint(point) {
    this.point = point;
  }

  @action setPLayTime(time) {
    this.playTime = time;
  }

  @action setThresholdPoint(thresholdPoint) {
    this.thresholdPoint = thresholdPoint;
  }

  @action setOperator(operator) {
    this.operator = operator;
  }

  @action reset() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.resultParameter = 0;
    this.correctResult = 0;
    this.point = 0;
    this.playTime = 0;
    this.thresholdPoint = 0;
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

  @computed get Point() {
    return this.point;
  }

  @computed get PlayTime() {
    return this.playTime;
  }

  @computed get ThresholdPoint() {
    return this.thresholdPoint;
  }

  @computed get TrueAnswer() {
    return this.moduleSelected.trueAnswer;
  }

  @computed get Operator() {
    return this.operator;
  }

  @computed get TypeEquation() {
    return this.typeEquation;
  }
}

const practiceStore = new PracticeStore();
export default practiceStore;
