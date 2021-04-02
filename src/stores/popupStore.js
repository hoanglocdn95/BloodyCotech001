import { observable, action, computed } from 'mobx';

import { TypePopup } from 'constants/common';

class PopupStore {
  @observable isShow = false;
  @observable type = '';
  @observable content = '';
  @observable callbackYes = () => {};
  @observable callbackNo = () => {};

  @action togglePopup = (
    isShowPopup,
    { type, content, callbackYes, callbackNo },
  ) => {
    this.isShow = isShowPopup;
    this.type = type ? type : TypePopup.NOTICE;
    this.content = content ? content : 'Something is missed';
    this.callbackYes = callbackYes ? callbackYes : () => {};
    this.callbackNo = callbackNo ? callbackNo : () => {};
  };

  @computed get IsShow() {
    return this.isShow;
  }
  @computed get Type() {
    return this.type;
  }
  @computed get Content() {
    return this.content;
  }
  @computed get CallbackYes() {
    return this.callbackYes;
  }
  @computed get CallbackNo() {
    return this.callbackNo;
  }
}

const popupStore = new PopupStore();
export default popupStore;
