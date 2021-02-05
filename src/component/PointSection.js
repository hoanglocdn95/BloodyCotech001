import * as React from 'react';
import { observer } from 'mobx-react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HomeIcon, ResetIcon } from '../assets/icons/index';
import { useNavigation } from '@react-navigation/native';
import { spaces, widthComponent } from '../constants/theme';
import { StackRoute } from '../constants/route';

const PointSection = props => {
  const Navigate = useNavigation();

  const goBackHome = () => {
    if (props.handleGoBack) {
      props.handleGoBack();
    }
    Navigate.navigate(StackRoute.Main.Welcome);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointContainer}>
        {props.isShowHomeButton && (
          <TouchableOpacity onPress={goBackHome}>
            <Image source={HomeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.point}>{props.point} Điểm</Text>
        {props.handleReset && (
          <TouchableOpacity onPress={() => props.handleReset()}>
            <Image source={ResetIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default observer(PointSection);

const styles = StyleSheet.create({
  container: {
    paddingTop: spaces.space4,
    width: '100%',
    alignItems: 'center',
  },
  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spaces.space4,
  },
  icon: {
    marginTop: spaces.space0,
    width: widthComponent.iconHeader,
    height: widthComponent.iconHeader,
  },
  point: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
