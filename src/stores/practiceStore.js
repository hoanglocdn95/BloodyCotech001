import { observable, action, computed } from 'mobx';

class PracticeStore {
  @observable firstParameter = 0;
  @observable secondParameter = 0;
  @observable isCorrect = true;
  @observable point = 0;
  @observable playTime = 0;
  @observable thresholdPoint = 0;

  arrPlayTime = [
    {
      time: 0,
      description: 'Không có thời gian',
    },
    {
      time: 45,
      description: 'Tiểu học',
    },
    {
      time: 30,
      description: 'Trung học',
    },
    {
      time: 15,
      description: 'Phổ thông',
    },
    {
      time: 10,
      description: '18 +',
    },
    {
      time: 3,
      description: 'Game là dễ',
    },
  ];

  @action setFirstParameter(item) {
    this.firstParameter = item;
  }
  @action setSecondParameter(item) {
    this.secondParameter = item;
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

  @action reset() {
    this.firstParameter = 0;
    this.secondParameter = 0;
    this.isCorrect = true;
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

  @computed get IsCorrect() {
    return this.isCorrect;
  }

  @computed get Point() {
    return this.point;
  }

  @computed get PlayTime() {
    return this.playTime;
  }

  @computed get ArrPlayTime() {
    return this.arrPlayTime;
  }

  @computed get ThresholdPoint() {
    return this.thresholdPoint;
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

const practiceStore = new PracticeStore();
export default practiceStore;
