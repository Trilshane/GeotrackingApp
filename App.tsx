import React from 'react';
import {Provider} from 'react-redux';
import store from './components/store/store';
import {Text, View, StyleSheet} from 'react-native';
import Coordinates from './components/Coordinats';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={styles.wrapper}>
        <Coordinates />
        <Text style={{height: 90}}>Hello world</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});

export default App;
