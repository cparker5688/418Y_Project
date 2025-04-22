import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import logotype from './assets/logotype.png';

import HomeScreen from './src/HomeScreen';
import MatchScreen from './src/MatchScreen';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <Image source={logotype} style={styles.logo} />
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;