import { Keyboard, StyleSheet, Text, View, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { TextInput } from 'react-native'
import RoundButton from '../components_universal/RoundButton'
import { icons } from '../components_universal/Icons'
import Animated, { interpolate, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

export default function InputBox({
    style,
}) {
    const [data, setData] = useState('')
    const transitionVal = useSharedValue(0)

    const handleTransition = () => {
        transitionVal.value = withDelay(0, withTiming(1))
    }
    const handleClose = () => {
        if (!data) {
            transitionVal.value = withTiming(0)
        }
        Keyboard.dismiss()
    }

    const buttonTransition = useAnimatedStyle(() => {
            const opacity = interpolate(transitionVal.value, [0,1], [0,1])
            return {
                opacity: opacity
            }
    })

    const labelTransition = useAnimatedStyle(() => {
            const translateY = interpolate(transitionVal.value, [0,1], [0,20])
            const scale = interpolate(transitionVal.value, [0,1], [1,0.8])
            return {
                transform: [
                    {translateY: translateY},
                    {scale: scale},
                ]
            }
    })

  return (
    <>
    {/* <Button onPress={handleTransition} title='test'/> */}
    <View style={[styles.boxContainer, style]}
     //onTouchStart={handleTransition}
    >
        <TextInput 
            style={styles.input} 
            onFocus={handleTransition}
            value={data}
            onChangeText={(e) => {setData(e)}}
        />
        <Animated.Text style={[styles.label, labelTransition]}>E-mail</Animated.Text>
        <Animated.View style={[{position: 'absolute', right: 0}, buttonTransition]}>
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'close'}
                iconSize={30}
                iconColor={COLORS.grey}
                style={{backgroundColor: 'transparent'}}
                onPressButton={() => {setData(''), handleClose()}}
            />
        </Animated.View>
    </View>
    <Pressable style={{height: height, width: width}} onPressIn={handleClose}></Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    boxContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        height: 50,
        width: width-60,
        borderRadius: 16,
        //backgroundColor: 'yellow',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.subPrimary02,
    },

    label: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        left: 20,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: COLORS.subPrimary,
    }
})