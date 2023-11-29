import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(TextInput)

export default function PointCounter() {
    var num = 2346;
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    console.log(realDigits);

    const animatedTextValue = useSharedValue(0)

    const animatedValue = useDerivedValue(() => {
        return withTiming(animatedTextValue.value, {duration: realDigits[3]*100} )
    })

    const animatedText = useAnimatedProps(() => {
        return {
            text: `test ${Math.floor(animatedValue.value)}`,
        }
    })

  return (
    <View style={{flexDirection: 'row'}}>

        {realDigits.map((num, index) => (<Text key={index}></Text> ))}
        <AnimatedText animatedProps={animatedText}/>
        <AnimatedText animatedProps={animatedText}/>
        <Button title='Test' onPress={() => animatedTextValue.value = realDigits[3]}/>
        {/* <Text>{realDigits[0]}</Text>
        <Text>{realDigits[1]}</Text>
        <Text>{realDigits[2]}</Text>
        <Text>{realDigits[3]}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({})