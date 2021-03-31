class EquationModule {
  constructor () {
    firstParameter = 0;
    secondParameter = 0;
  }
  public randomNumber = (to, from) => {
    return Math.floor(Math.random() * from) + to;
  };

  public calculateResult = (rightResult, wrongResult) => {
    const isTrue = Math.floor(Math.random() * 2);
    if (isTrue === 0) {
      return rightResult();
    }
    return wrongResult();
  };
}
