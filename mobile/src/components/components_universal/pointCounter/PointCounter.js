import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import AnimatedText from './AnimatedText';


export default function PointCounter() {
    var [num, setNum] = useState(0);
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    console.log(realDigits);

  return (
    <View>
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 300}}>
        {realDigits.map((digit, index) => (<AnimatedText key={index} num={digit} delay={index*50}/>))}

    </View>
    <Button title='Test' onPress={() => setNum(509)}/>
        <Button title='Reset' onPress={() => setNum(0)}/>
        <Button title='Add' onPress={() => setNum(num + 50)}/>
        <Button title='decrease' onPress={() => num -50 <0? console.log('false') : setNum(num - 100)}/>
    </View>
  )
}

const styles = StyleSheet.create({})