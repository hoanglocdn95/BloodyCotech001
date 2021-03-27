import SInfo from 'react-native-sensitive-info';

export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SInfo.setItem(key, jsonValue, {});
  } catch {
    e => {
      console.log('setData', e);
    };
  }
};

export const getData = async key => {
  try {
    const jsonValue = await SInfo.getItem(key, {});
    if (!jsonValue) {
      return setData(key, '0');
    }
    const res = JSON.parse(jsonValue);
    return res;
  } catch {
    e => {
      console.log('getData', e);
    };
  }
};

export const deleteData = async key => {
  try {
    SInfo.deleteItem(key, {});
  } catch {
    e => {
      console.log('deleteData', e);
    };
  }
};
