import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import { colors, fonts, spaces, borderRadius } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from '../constants/route';
import { PlayIcon } from '../assets/icons/index';
import PracticeStore from '../stores/practiceStore';
import Checkbox from '../component/Form/Checkbox';

const ChooseTimeScreen = observer(() => {
  const Navigate = useNavigation();

  const renderListCheckbox = () => {
    return PracticeStore.ArrPlayTime.map((item, index) => {
      return (
        <Checkbox
          key={`${item.time}_${index}`}
          handleCheckValue={() => PracticeStore.setPLayTime(item.time)}
          value={item.time}
          label={
            item.time === 0
              ? `${item.description}`
              : `${item.time} giây (${item.description})`
          }
          valueSelected={PracticeStore.PlayTime}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styleTitle}>Chọn thời gian chơi</Text>
      <View style={styles.containerList}>{renderListCheckbox()}</View>
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() => Navigate.navigate(StackRoute.Main.Practice)}>
        <Image source={PlayIcon} />
      </TouchableHighlight>
    </View>
  );
});

export default ChooseTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bg_primary,
    paddingTop: '20%',
  },
  styleTitle: {
    textTransform: 'uppercase',
    color: colors.text,
    fontSize: fonts.larger,
    marginRight: spaces.space2,
  },
  containerList: {
    marginTop: spaces.space5,
  },
  imageContainer: {
    minWidth: 150,
    backgroundColor: colors.white,
    borderRadius: borderRadius.header,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spaces.space3,
    position: 'absolute',
    bottom: spaces.space3,
  },
});
