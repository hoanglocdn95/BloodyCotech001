import calculateMeasure from './responsiveBase';

const baseFontSize = calculateMeasure(14);
const space0 = calculateMeasure(4);

export const fonts = {
  tiny: baseFontSize * 0.5,
  small: baseFontSize * 0.75,
  normal: baseFontSize * 1,
  medium: baseFontSize * 1.25,
  large: baseFontSize * 1.5,
  larger: baseFontSize * 1.75,
  largest: baseFontSize * 2,
  header1: baseFontSize * 2.5,
  header2: baseFontSize * 3,
  header3: baseFontSize * 3.5,
  header4: baseFontSize * 4,
  header5: baseFontSize * 4.5,
  header6: baseFontSize * 5,
};

export const colors = {
  bg_primary: '#035aa6',
  bg_secondary: '#120136',
  border: '#40bad5',
  text: '#fcbf1e',
  white: '#f4f6ff',
  white_milk: '#f4f4f4',
  black: '#2f2519',
  black_light: '#4a3f35',
  black_transparent: 'rgba(0,0,0,0.3)',
};

export const spaces = {
  space0: space0 * 1, // 4
  space1: space0 * 2, // 8
  space2: space0 * 3, // 12
  space3: space0 * 4, // 16
  space4: space0 * 5, // 20
  space5: space0 * 6, // 24
  space6: space0 * 7, // 28
  space7: space0 * 8, // 32
  space8: space0 * 9, // 36
  space9: space0 * 10, // 40
};

export const borderRadius = {
  button: 4,
  header: 12,
  circle: 999,
};

export const borderWidth = {
  normal: 1,
  bolder: 6,
};

export const widthComponent = {
  progressBar: space0 * 80, // 320
  iconHeader: space0 * 10, //40
};
