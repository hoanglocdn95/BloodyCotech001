import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, fonts, spaces } from 'constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';
import { ThresholdPeek, Right, Wrong } from 'constants/common';

import WorkingSection from 'component/WorkingSection';
import AnswerButton from 'component/AnswerButton';
import PointSection from 'component/PointSection';

import PracticeStore from 'stores/practiceStore';
import CounterStore from 'stores/counterStore';
import PopupStore from 'stores/popupStore';
import CountDown from 'react-native-countdown-component';
import { TypePopup } from 'constants/common';

const windowWidth = Dimensions.get('window').width;

const PracticeScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  useEffect(() => {
    PracticeStore.getValue();
    PracticeStore.setThresholdPoint(PracticeStore.Point + ThresholdPeek);
  }, []);

  useEffect(() => {
    if (PracticeStore.Point >= PracticeStore.ThresholdPoint) {
      PopupStore.togglePopup(true, {
        type: TypePopup.QUESTION,
        content: t('practice.popupChangeLevel'),
        callbackYes: () => Navigate.goBack(),
        callbackNo: () =>
          PracticeStore.setThresholdPoint(PracticeStore.Point + ThresholdPeek),
      });
    }
  }, [PracticeStore.point]);

  const pressAnswer = type => {
    CounterStore.reset();
    if (type !== PracticeStore.TrueAnswer) {
      return navigateToFailed();
    } else {
      PracticeStore.getValue();
      return PracticeStore.setPoint(PracticeStore.Point + 1);
    }
  };

  const reset = isResetPoint => {
    if (isResetPoint) {
      PracticeStore.setPoint(0);
    }
    PracticeStore.getValue();
  };

  const navigateToFailed = () => {
    return Navigate.navigate(StackRoute.Main.Failed);
  };

  return (
    <>
      <View style={styles.container}>
        <PointSection
          point={PracticeStore.Point}
          handleReset={() => reset(false)}
          handleGoBack={() => reset(true)}
          isShowHomeButton
        />
        {!!PracticeStore.PlayTime && (
          <CountDown
            id={`counter-${CounterStore.IsReset}`}
            until={PracticeStore.PlayTime}
            onFinish={() => navigateToFailed()}
            size={spaces.space4}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTextStyle}
            running={!PopupStore.IsShow}
          />
        )}
        <View style={styles.body}>
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={PracticeStore.ResultParameter}
            operator={PracticeStore.Operator}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer(Right)}
          onWrongAnswer={() => pressAnswer(Wrong)}
        />
      </View>
    </>
  );
});

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_primary,
  },
  body: {
    width: windowWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTextStyle: {
    color: colors.bg_primary,
    fontSize: fonts.larger,
  },
  digitStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
    width: spaces.space9,
    height: spaces.space9,
  },
});
