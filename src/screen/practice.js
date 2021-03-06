import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { colors, fonts, spaces } from 'constants/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoute } from 'constants/route';
import { ThresholdPeek, Right, Wrong } from 'constants/common';

import WorkingSection from 'component/WorkingSection';
import AnswerButton from 'component/AnswerButton';
import PointSection from 'component/PointSection';
import Popup from 'component/Popup';

import PracticeStore from 'stores/practiceStore';
import CounterStore from 'stores/counterStore';
import CountDown from 'react-native-countdown-component';

const windowWidth = Dimensions.get('window').width;

const PracticeScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();
  const [result, setResult] = useState(PracticeStore.calculateResult());
  const [isShowModal, setShowModal] = useState(false);

  function randomNumber(to, from) {
    return Math.floor(Math.random() * from) + to;
  }

  useFocusEffect(React.useCallback(() => {}, []));

  useEffect(() => {
    PracticeStore.setFirstParameter(randomNumber(1, 9));
    PracticeStore.setSecondParameter(randomNumber(1, 9));
    PracticeStore.setThresholdPoint(PracticeStore.Point + ThresholdPeek);
    setResult(PracticeStore.calculateResult());
  }, []);

  useEffect(() => {
    if (PracticeStore.Point >= PracticeStore.ThresholdPoint) {
      setShowModal(true);
    }
  }, [PracticeStore.point]);

  const pressAnswer = type => {
    const isTrue =
      PracticeStore.FirstParameter + PracticeStore.SecondParameter === result;
    CounterStore.reset();

    if ((type === Wrong && isTrue) || (type === Right && !isTrue)) {
      return navigateToFailed();
    }
    if ((type === Wrong && !isTrue) || (type === Right && isTrue)) {
      PracticeStore.setFirstParameter(randomNumber(1, 9));
      PracticeStore.setSecondParameter(randomNumber(1, 9));
      setResult(PracticeStore.calculateResult());
      return PracticeStore.setPoint(PracticeStore.Point + 1);
    }
  };

  const reset = isResetPoint => {
    if (isResetPoint) {
      PracticeStore.setPoint(0);
    }
    PracticeStore.setFirstParameter(PracticeStore.randomNumber(1, 9));
    PracticeStore.setSecondParameter(PracticeStore.randomNumber(1, 9));
    setResult(PracticeStore.calculateResult());
  };

  const handleChangeLevel = () => {
    Navigate.goBack();
  };

  const handleIgnoreChangeLevel = () => {
    PracticeStore.setThresholdPoint(PracticeStore.Point + ThresholdPeek);
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
            running={!isShowModal}
          />
        )}
        <View style={styles.body}>
          <WorkingSection
            firstParameter={PracticeStore.FirstParameter}
            secondParameter={PracticeStore.SecondParameter}
            result={result}
          />
        </View>
        <AnswerButton
          onRightAnswer={() => pressAnswer(Right)}
          onWrongAnswer={() => pressAnswer(Wrong)}
        />
      </View>
      <Popup
        isShowPopup={isShowModal}
        handleClosePopup={isShow => setShowModal(isShow)}
        handleYesButton={handleChangeLevel}
        handleNoButton={handleIgnoreChangeLevel}
        content={t('practice.popupChangeLevel')}
      />
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
