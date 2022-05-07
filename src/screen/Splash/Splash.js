import React, {Component, useEffect} from 'react';
import {Animated, Easing, StyleSheet, ToastAndroid, View} from 'react-native';
import GetAllTask from '../../services/Task/GetAllTask/GetAllTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const size = 100;
const innerSize = size / 3;

const Splash = () => {
  const navigation = useNavigation();
  const color1 = '#FFF';
  const color2 = '#FFF';
  const color3 = '#FFF';
  const color4 = '#FFF';
  const color5 = '#FFF';
  const animation = new Animated.Value(0);
  const Dim = size;
  const angle = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '72deg', '360deg'],
  });
  const angle0 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '144deg', '360deg'],
  });
  const angle1 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '216deg', '360deg'],
  });
  const angle2 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '288deg', '360deg'],
  });
  const angle3 = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '360deg'],
  });
  const outerAngle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const getAllTask = async () => {
      const allData = await GetAllTask();

      if (allData.status === 'success') {
        await AsyncStorage.setItem('tasks', JSON.stringify(allData.tasks)).then(
          async () => {
              navigation.replace('Login');
          },
        );
      } else {
        ToastAndroid.show(allData.message, ToastAndroid.SHORT);
        await AsyncStorage.setItem('tasks', JSON.stringify([]))
          .then(() => {
            navigation.navigate('Login');
          })
          .catch(error => {
            console.log('Terjadi Kesalahan');
          });
      }
    };

    getAllTask();

  }, [])
  

  return (
    <View style={styles.container}>
    <Animated.View
      style={{width: Dim, height: Dim, transform: [{rotate: outerAngle}]}}>
      <Animated.View
        style={{...styles.item, transform: [{rotate: angle3}]}}>
        <View
          style={{
            ...styles.innerItem,
            backgroundColor: color1,
          }}></View>
      </Animated.View>
      <Animated.View
        style={{...styles.item, transform: [{rotate: angle2}]}}>
        <View
          style={{
            ...styles.innerItem,
            backgroundColor: color2,
          }}></View>
      </Animated.View>
      <Animated.View
        style={{...styles.item, transform: [{rotate: angle1}]}}>
        <View
          style={{
            ...styles.innerItem,
            backgroundColor: color3,
          }}></View>
      </Animated.View>
      <Animated.View
        style={{...styles.item, transform: [{rotate: angle0}]}}>
        <View
          style={{
            ...styles.innerItem,
            backgroundColor: color4,
          }}></View>
      </Animated.View>
      <Animated.View style={{...styles.item, transform: [{rotate: angle}]}}>
        <View
          style={{
            ...styles.innerItem,
            backgroundColor: color5,
          }}></View>
      </Animated.View>
    </Animated.View>
  </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 10, 38, 1)',
  },
  item: {
    width: size,
    height: size,
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
  },
  innerItem: {
    height: innerSize / 10,
  },
});