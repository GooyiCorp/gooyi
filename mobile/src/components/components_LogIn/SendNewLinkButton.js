import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import BigButton from './BigButton'
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
export default function SendNewLinkButton({
    handleOnPress,
    style,
    counterValue,
}) {
    
    // --------------------------------------------------------------------- Value
    const [counter, setCounter] = useState(0);
    const [success, setSuccess] = useState(false)
    const [disable, setDisable] = useState(false)
    const [reset, setReset] = useState(true)
    const iconAnimation = useSharedValue(0)

    // --------------------------------------------------------------------- Counter
    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
          if (counter == 0) {
            // Enable onPress
            setDisable(false)

            // Reset to Initial State
            setReset(true)
            setSuccess(false)
            iconAnimation.value = 0
          }
        return () => clearInterval(timer);
      }, [counter]);

    // --------------------------------------------------------------------- Animation: Animated Style
    // Left Icon
    const translateLeftIcon = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconAnimation.value, [0,1,2,3], [0,1,1,0]),
            transform: [
                {scaleY: interpolate(iconAnimation.value, [0,1,2,3], [0,1,1,0])},
                {translateX: interpolate(iconAnimation.value, [0,1,2,3], [0, 0, 150, 150])}
            ]
        }
    })

    // Right Icon
    const translateRightIcon = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconAnimation.value, [0,1,2,3], [0,0,1,0]),
            transform: [
                {scaleY: interpolate(iconAnimation.value, [0,1,2,3], [0,0,1,0])}
            ]
        }
    })

    // Label
    const labelAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconAnimation.value, [0,0.05,2,3,3.5], [1,0,0,1,0])
        }
    })

    // Counter
    const showCounter = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconAnimation.value, [0,1,2,3,4], [0,0,0,0,1])
        }
    })

    // Main Container
    const animateMainContainer = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(iconAnimation.value, [0,1,2,3,4], [COLORS.white03,COLORS.white03,COLORS.white03,COLORS.white03,'transparent']),
            borderWidth: interpolate(iconAnimation.value, [0,1,2,3,4], [0,0,0,0,1])
        }
    })

    // --------------------------------------------------------------------- handle Press Button
    const handlePress = () => {

        setDisable(true)
        
        setReset(false)

        // handleOnPress
        handleOnPress()

        // Animation
        iconAnimation.value = withSequence(
            withTiming(1, {duration: 300}), 
            withDelay(300, withTiming(2, {duration: 400, easing: Easing.bezier(0.27, 0, 0.4, 0.08)}) ), 
            withDelay(700, withTiming(3, {duration: 300}) ),
            withDelay(1500, withTiming(4)),
        )
        
        // handle Success / Failure
        setSuccess(true)
        
        // Start Counter
        setTimeout(() => {
            setCounter(counterValue)
        }, 3500)    
        
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  return (

    <TouchableOpacity 
        onPress={handlePress}
        disabled={disable}
        style={style}
    >

    <Animated.View style={[styles.buttonContainer, animateMainContainer]}>
        
        {/* --------------------------------------------------------------------- Label */}
        <Animated.Text style={[styles.title,labelAnimation]}>
            {reset? 'Link erneut zusenden' : (success? 'Gesendet' : 'Senden nicht möglich')}
        </Animated.Text>

        {/* --------------------------------------------------------------------- Icon Container */}
        <View style={styles.iconContainer}>

            {/* Icon Left */}
            <Animated.View style={[styles.iconLeftContainer, translateLeftIcon]}>
                <Icons
                    icon={icons.Ionicons}
                    iconName={'ios-send-sharp'}
                    iconSize={20}
                    iconColor={COLORS.white}
                />
            </Animated.View>

            {/* Icon Right */}
            <Animated.View style={[styles.iconRightContainer, translateRightIcon]}></Animated.View>

        </View>

        {/* --------------------------------------------------------------------- Counter */}
        <Animated.View style={[styles.counterContainer, showCounter]}>

            <Text style={styles.info}>Erneut möglich in:</Text>

            {/* Counter */}
            <View style={styles.counterBox}>
                <Text style={styles.counter}>{counter}</Text>
            </View>

        </Animated.View>

    </Animated.View>

    </TouchableOpacity>

  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
const styles = StyleSheet.create({

    buttonContainer: {
        height: 50,
        width: 200,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: COLORS.white03,
        paddingHorizontal: 25, 
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        overflow: 'hidden',
        borderColor: COLORS.white03,
        borderWidth: 1
    },

    title: {
        fontFamily: 'RH-Medium',
        color: COLORS.white,
        fontSize: 15
    },

    iconLeftContainer: {
        position: 'absolute',
        left: 0
    },

    iconRightContainer: {
        position: 'absolute',
        right: 0,
        width: 3,
        height: 20,
        backgroundColor: COLORS.white,
    },

    iconContainer: {
        height: 20,
        width: '100%',
        //backgroundColor: 'yellow',
        position: 'absolute',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    info: {
        fontFamily: 'RH-Medium',
        fontSize: 12,
        color: COLORS.white,
        marginLeft: 10,
    },

    counterContainer: {
        height: '100%',
        width: '100%',
        //backgroundColor: COLORS.primary,
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    counter: {
        fontFamily: 'RH-Bold',
        color: COLORS.white,
        fontSize: 18,
    },

    counterBox: {
        height: 30,
        width: 30,
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    }

})