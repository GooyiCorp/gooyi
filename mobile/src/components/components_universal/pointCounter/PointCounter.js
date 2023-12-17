import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import AnimatedText from './AnimatedText';
import { useDispatch, useSelector } from 'react-redux';
import { decreasePoint, increasePoint, setPoint } from '../../../redux/slices/pointSlice';
import {width} from '../../../constants/size'


export default function PointCounter() {
  // var digits = num.toString().split('');
  // var realDigits = digits.map(Number)
  // console.log(realDigits);
  const dispatch = useDispatch()
  const point = useSelector((state) => state.point.point)
  const payload = useSelector((state) => state.point.payload)

  useEffect(() => {
      dispatch(setPoint(1233))
  }, [])

  console.log(payload)


  return (
    <View>
    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'yellow'}}>
        {/* {realDigits.map((digit, index) => (<AnimatedText key={index} num={digit} delay={index*50}/>))} */}
        <Text>Test</Text>
        <AnimatedText num={point} duration={1000}/>

    </View>


        <Button title='Test' onPress={() => dispatch(setPoint(12331))}/>
        <Button title='Reset' onPress={() => dispatch(decreasePoint(point))}/>

        <Button title='increase' onPress={() => dispatch(increasePoint(100))}/>
        <Button title='decrease' onPress={() => dispatch(decreasePoint(200))}/>
    </View>
  )
}

const styles = StyleSheet.create({})