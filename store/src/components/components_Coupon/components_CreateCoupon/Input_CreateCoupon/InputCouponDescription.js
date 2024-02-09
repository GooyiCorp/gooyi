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
export default function InputCouponDescription({
    setInputData,
    handleSubmit,
}) {

    const dispatch = useDispatch()
    const [data, setData] = useState('')
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
        const descriptionLength = useAnimatedStyle(() => {
            return {
                opacity: focusInput.value
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
<View style={{width: '100%', marginBottom: 15}}>
        <Animated.Text style={[T4, styles.label, labelTransition]}>Beschreibung</Animated.Text>

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
            onChangeText={ (e) => (setData(e), setInputData(e)) }
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
            multiline={true}
            maxLength={200}
            scrollEnabled={true}
        />

    </Animated.View>
    <Animated.Text style={[T4, {fontFamily: 'RH-Regular', color: COLORS.black, fontSize: 12, alignSelf: 'flex-end', marginTop: 5}, descriptionLength]}>{data.length} / 200</Animated.Text>

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        height: 100,
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