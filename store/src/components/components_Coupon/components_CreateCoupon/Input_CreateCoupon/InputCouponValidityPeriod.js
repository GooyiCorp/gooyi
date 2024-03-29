import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// Helpers

// Components

import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../../helper/constants/colors'
import { T4 } from '../../../../helper/constants/text'
import IconButton from '../../../universal/Buttons/IconButton'
import { icons } from '../../../universal/Icons/Icons'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function InputCouponValidityPeriod({
    setInputData,
    handleSubmit,
    onPress
}) {

    const dispatch = useDispatch()
    const data = useSelector(state => state.createCoupon.validityTime)
    const [focus, setFocus] = useState(false)
    const error = false

    // ----------------------------  
    // Animation
    // ---------------------------- 
    // Value
    const focusInput = useSharedValue(0)
    // ---- start - Animated Style
        // Label Style
        const labelTransition = useAnimatedStyle(() => {
            return {
                color: interpolateColor(focusInput.value, [0,1], [COLORS.grey, COLORS.ivoryDark2])
            }
        })
        // Label Style
        const borderTransition = useAnimatedStyle(() => {
            return {
                borderColor: error? COLORS.primary : interpolateColor(focusInput.value, [0,1], [COLORS.ivoryDark2, COLORS.grey])
            }
        })
    // ---- end - Animated Style

    // ----------------------------  
    // Handler Section
    // ---------------------------- 
        // Clear Button Handler
        const handleClear = () => {
            setData('')
            // dispatch(setEmailError(false))
            handleOnBlur()
            Keyboard.dismiss()
        }
        // onFocus Hanlder
        const handleOnFocus = () => {
            setFocus(true)
            focusInput.value = withDelay(0, withTiming(1, {duration: 200}))
        }
        // onBlur
        const handleOnBlur = () => {
            setFocus(false)
            data? focusInput.value = 1 : focusInput.value = withDelay(0, withTiming(0, {duration: 200}))
        }
        // handle onChangeText
        const handleOnChangeText = (e) => {
            // dispatch(setEmailError(false))
            setData(e)
        }
        // handle Press Input Submit
        const handleInputSubmit = () => {
            handleSubmit()
        }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={{width: '35%', marginBottom: 15}}>
    <Animated.Text style={[T4, styles.label, labelTransition]}>Gültigkeit</Animated.Text>

    {/* ------------------------------------------------ */}
    {/* Input Section */}
    {/* ------------------------------------------------ */}
    <Animated.View 
        style={[
            styles.container,
            borderTransition
            // {
            //     borderColor: error? COLORS.primary : (focus? COLORS.ivoryDark2 : COLORS.grey)
            // },
        ]}
    >
        <TextInput 
            // Input Data
            value={ data }
            // onFocus/onBlur
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            // onChangeText 
            onChange={handleOnChangeText}
            // Pass Data
            onSubmitEditing={handleInputSubmit}
            // Style
            style={[styles.input, {color: error ? COLORS.primary : COLORS.grey}]}

            // placeholder='z.B.: 20% Rabatt auf '
            placeholderTextColor={error ? COLORS.primary02 : COLORS.ivoryDark2}

            editable={false}
            onPressIn={onPress}
        />
        {/* ---- start - Right View */}
        <View 
            style={[
                styles.rightView,
                // {zIndex: focus? 1 : 0}
            ]}
        >
            {/* Clear Button */}
            <IconButton 
                icon={icons.Ionicons}
                iconName={'caret-down'}
                iconSize={18}
                iconColor={COLORS.grey}
                styleContainer={{
                    alignItems: 'flex-end',
                    height: '100%',
                    borderRadius: 0,
                    paddingBottom: 5,
                    backgroundColor: 'transparent',
                }}
            />
        </View>
        {/* ---- end - Right View */}

        

    </Animated.View>
</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        height: 35,
        width: '100%',
        borderBottomWidth: 0.5,
    },
    rightView: {
        height: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
    },
    input: {
        height: '100%',
        width: '100%',
        fontFamily: 'RH-Medium',
        color: COLORS.grey,
        fontSize: 15,
        paddingBottom: 8,
        paddingRight: 50,
        zIndex: 1,
    },
    label: {
        color: COLORS.ivoryDark2,
        fontFamily: 'RH-Bold',
        zIndex: 1,
    },
})