/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/routes/Stack/Stack';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App;
