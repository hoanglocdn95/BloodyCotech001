import EquationModule from './equationModule';

class SubtractModule extends EquationModule {
  init = (min, max) => {
    this.initEquation(min, max);
    this.setResult(this.firstParameter + this.secondParameter);
    this.calculateResultParameter();
    this.exchangeParamter();
  };

  returnValue = () => {
    return {
      firstParameter: this.firstParameter,
      secondParameter: this.secondParameter,
      resultParameter: this.resultParameter,
      correctResult: this.correctResult,
    };
  };
}

const subtractModule = new SubtractModule();
export default subtractModule;
