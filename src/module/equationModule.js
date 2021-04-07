import { Right, Wrong } from 'constants/common';

export default class EquationModule {
  constructor() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.resultParameter = 0;
    this.correctResult = 0;
    this.trueAnswer = Right;
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
  };

  initEquation = (min, max) => {
    this.firstParameter = this.randomNumber(min, max);
    this.secondParameter = this.randomNumber(min, max);
  };
  setResult = result => {
    this.correctResult = result;
  };

  exchangeParamter = () => {
    const tmp1 = this.firstParameter;
    this.firstParameter = this.resultParameter;
    this.resultParameter = tmp1;
  };

  calculateResultParameter = () => {
    const isTrue = Math.floor(Math.random() * 2);
    if (isTrue === 0) {
      this.resultParameter = this.correctResult;
      this.trueAnswer = Right;
    } else {
      const isBigger = Math.floor(Math.random() * 2);
      const spaceRand = Math.floor(Math.random() * 5) + 1;
      if (isBigger === 0) {
        this.resultParameter = this.correctResult + spaceRand;
      } else {
        this.resultParameter = this.correctResult - spaceRand;
      }
      this.trueAnswer = Wrong;
    }
  };
}
