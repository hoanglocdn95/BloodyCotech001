import EquationModule from './equationModule';

class MultiModule extends EquationModule {
  init = (min, max) => {
    this.initEquation(min, max);
    this.setResult(this.firstParameter * this.secondParameter);
    this.calculateResultParameter();
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

const multiModule = new MultiModule();
export default multiModule;
