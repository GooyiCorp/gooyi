import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Button } from 'react-native'
import RoundButton from './RoundButton'
import { icons } from './Icons'
import { COLORS } from '../../index/constantsindex'

export default function AnimatedSuccessIcon() {

    const [reset, setReset] = useState(true)
    const animationVal = useSharedValue(0)

    const translateOuterCircle = useAnimatedStyle(() => {
        const scale = interpolate(animationVal.value, [0,1], [0,1])
        return {
            transform: [
                {scale: scale}
            ]
        }
    })

    const translateInnerCircle = useAnimatedStyle(() => {
        const scale = interpolate(animationVal.value, [0,1], [0,1])
        return {
            transform: [
                {scale: scale}
            ],
        }
    })

    useEffect(() => {
        animationVal.value = withSpring(1)
        setReset(false)
    }, [reset])

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={[styles.circle, {backgroundColor: 'green'}, translateOuterCircle]}>
       <Animated.View style={[styles.circle, translateInnerCircle]}></Animated.View>
      {/* <RoundButton 
          icon={icons.FontAwesome5}
          iconName={'check'}
          iconSize={50}
          iconColor={COLORS.white}
          style={{
              backgroundColor: 'green',
              height: 100,
              width: 100,
              position: 'absolute'
          }}
      /> */}
      </Animated.View>
      <Button title='reset' onPress={() => {animationVal.value = 0, setReset(true)}}/>
    </View>
  )
}

const styles = StyleSheet.create({

    circle: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        
    },


})