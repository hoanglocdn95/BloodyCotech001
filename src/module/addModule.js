import EquationModule from './equationModule';

class AddModule extends EquationModule {
  init = (min, max) => {
    this.initEquation(min, max);
    this.setResult(this.firstParameter + this.secondParameter);
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

const addModule = new AddModule();
export default addModule;
