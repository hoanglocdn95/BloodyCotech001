import { observable, action, computed } from 'mobx';
import addModule from 'module/addModule';
import { TypeEquation } from 'constants/common';

class PracticeStore {
  @observable firstParameter = 0;
  @observable secondParameter = 0;
  @observable resultParameter = 0;
  @observable correctResult = 0;
  @observable point = 0;
  @observable playTime = 0;
  @observable thresholdPoint = 0;
  @observable typeEquation = TypeEquation.ADDITION;

  @action getValue() {
    addModule.init(1, 9);
    const {
      firstParameter,
      secondParameter,
      resultParameter,
      correctResult,
    } = addModule.returnValue();
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

  @action setTypeEquation(type) {
    this.typeEquation = type;
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
    return addModule.trueAnswer;
  }

  @computed get TypeEquation() {
    return this.typeEquation;
  }
}

const practiceStore = new PracticeStore();
export default practiceStore;
