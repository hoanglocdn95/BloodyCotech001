import SInfo from 'react-native-sensitive-info';

export const setData = (key, value) =>
  new Promise((resolve, reject) => {
    const res = SInfo.setItem(key, value, {});
    if (res) {
      resolve(res);
    } else {
      reject(res);
    }
  });

export const getData = key =>
  new Promise(function(resolve, reject) {
    console.log('key', key);
    const res = SInfo.getItem(key, {});
    if (res) {
      resolve(res);
    } else {
      reject(res);
    }
  });

export const deleteData = key =>
  new Promise((resolve, reject) => {
    const res = SInfo.deleteItem(key, {});
    if (res) {
      resolve(res);
    } else {
      reject(res);
    }
  });

export const gettingAllKeys = new Promise(SInfo.getAllItems({}));
