import { observable, action, computed } from 'mobx';

class LoadingStore {
  @observable isShowLoading = false;

  @action setLoadingIndicator(status, callback) {
    this.isShowLoading = status;
    if (callback) {
      callback();
    }
  }

  @computed IsShowLoading() {
    return this.isShowLoading;
  }
}

const loadingStore = new LoadingStore();
export default loadingStore;
