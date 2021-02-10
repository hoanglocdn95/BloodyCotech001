module.exports = api => {
  // var isTest = api.cache(() => process.env.NODE_ENV) === 'test';
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          root: ['src'],
          extensions: ['.js'],
        },
      ],
    ],
  };
};

// module.exports = api => {
//   var isTest = api.cache(() => process.env.NODE_ENV) === 'test';
//   return {
//     presets: isTest
//       ? ['module:metro-react-native-babel-preset']
//       : ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
//     plugins: [
//       ['@babel/plugin-proposal-decorators', { legacy: true }],
//       [
//         'module-resolver',
//         {
//           root: ['src'],
//           extensions: ['.ts', '.tsx', '.js'],
//         },
//       ],
//     ],
//   };
// };
