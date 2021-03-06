import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

export const ReqConfigAdmob = () => {
  admob()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
    .then(res => {
      console.log('ReqConfigAdmob Respond', res);
    })
    .catch(e => {
      console.log('ReqConfigAdmob Error', e);
    });
};
