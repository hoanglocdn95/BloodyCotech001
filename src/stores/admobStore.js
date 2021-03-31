import { observable, action, computed } from 'mobx';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import AppID from 'constants/admob';

const immediateID_1 = TestIds.INTERSTITIAL;
// const immediateID_1 = AppID.interstitial.FAILED_SCREEN.id;
const immediateAD_1 = InterstitialAd.createForAdRequest(immediateID_1, {
  requestNonPersonalizedAdsOnly: true,
});

class AdmobStore {
  @observable currentAD = {};
  @observable eventListenerAD = () => {};

  @action setCurrentAD = () => {
    this.currentAd = immediateAD_1;
    console.log(
      'file: admobStore.js ~ line 21 ~ this.currentAd',
      this.currentAd,
    );
  };

  @action async initAd() {
    console.log('this.currentAd', this.currentAd);
    this.eventListenerAd = this.currentAD.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoadAdMob(true);
        // LoadingStore.setLoadingIndicator(false);
      }
    });
    await this.currentAD.load();
  }

  @action showCurrentAD() {
    this.currentAD.show();
  }

  @action unsubscribeAD() {
    this.eventListenerAD();
  }
}

const admobStore = new AdmobStore();
export default admobStore;
