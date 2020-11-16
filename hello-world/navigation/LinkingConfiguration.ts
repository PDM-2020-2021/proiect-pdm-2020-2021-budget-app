import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'Home',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'Reports',
            },
          },
          TabThree: {
            screens: {
              TabTwoScreen: 'Bills',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
