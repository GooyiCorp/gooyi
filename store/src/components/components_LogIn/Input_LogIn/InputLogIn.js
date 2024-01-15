import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// Helpers
import { COLORS } from '../../../helper/constants/colors'
// Components
import IconButton from '../../universal/Buttons/IconButton'
import Icons, { icons } from '../../universal/Icons/Icons'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function InputLogIn({
    // Error Message
    errorMessageCaseEmpty,
    errorMessageDataValidity,
    // Check Algorithm
    checkAlgorithm,
    // Label
    label,
    // check Status
    checkSuccess,
    checkFailed,
    // Secure Text
    secureTextEntry
}) {

    const [data, setData] = useState('')
    const [focus, setFocus] = useState(false)
    const [error, setError] = useState(true)

    // ----------------------------  
    // Animation
    // ---------------------------- 
    // Value
    const focusInput = useSharedValue(0)
    // ---- start - Animated Style
        // Label Style
        const labelTransition = useAnimatedStyle(() => {
            return {
                transform: [
                    {translateY: interpolate(focusInput.value, [0,1], [0,20])},
                ],
                color: interpolateColor(focusInput.value, [0,1], [COLORS.grey, COLORS.black])
            }
        })
        // Label Container
        const labelContainerTransition = useAnimatedStyle(() => {
            return {
                transform: [
                    {translateY: interpolate(focusInput.value, [0,1], [0,7])},
                    {scale: interpolate(focusInput.value, [0,1], [1,0.8])},
                ]
            }
        })
        // Label Background
        const labelBgTransition = useAnimatedStyle(() => {
            return {
                transform: [
                    {scaleX: interpolate(focusInput.value, [0,1], [0,1])},
                ]
            }
        })
    // ---- end - Animated Style

    // ----------------------------  
    // Check Validity
    // ---------------------------- 
    const checkValidity = () => {
        const check = checkAlgorithm

        // Case: failed -> Error
        if (!check.test(data)) {
            setError(true)
            // Check Failed State
            checkFailed()
            return
        } 
        // Case: success -> handle ServerRequest
        else {
            setError(false)
            // Check Success State
            checkSuccess()
            return
        }   
        
        }
    // ----------------------------  
    // Handler Section
    // ---------------------------- 
        // Clear Button Handler
        const handleClear = () => {
            setData('')
            setError(false)
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
            setError(false)
            setData(e)
        }
        // handle Press Input Submit
        const handleInputSubmit = () => {
            !data? (setError(true), checkFailed()) : checkValidity()
        }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<>
    {/* ------------------------------------------------ */}
    {/* Input Section */}
    {/* ------------------------------------------------ */}
    <View 
        style={[
            styles.container,
            {
                borderColor: error? COLORS.primary : (focus? COLORS.subPrimary : COLORS.borderGrey)
            },
        ]}
    >

        <TextInput 
            // Input Data
            value={ data }
            onChangeText={ (e) => setData(e) }
            // onFocus/onBlur
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            // onChangeText 
            onChange={handleOnChangeText}
            // Pass Data
            onSubmitEditing={handleInputSubmit}
            // Style
            style={styles.input}
            // Text Secure
            secureTextEntry={secureTextEntry}
        />
        {/* ---- start - Right View */}
        <View 
            style={[
                styles.rightView,
                {zIndex: focus? 1 : 0}
            ]}
        >
            {/* Clear Button */}
            <IconButton 
                icon={icons.Ionicons}
                iconName={'close'}
                iconSize={30}
                iconColor={COLORS.subPrimary}
                styleContainer={{
                    backgroundColor: 'transparent',
                    opacity: focus? 1 : 0, 
                    transform: [
                        {scaleX: focus? 1 : 0}
                    ]
                }}
                onPress={handleClear}
            />
        </View>
        {/* ---- end - Right View */}

        <Animated.View style={[styles.labelContainer, labelContainerTransition]}>
            <Animated.Text style={[styles.label, labelTransition]}>{label}</Animated.Text>
            <Animated.View style={[styles.labelBg, labelBgTransition]}></Animated.View>
        </Animated.View>
    </View>

    {/* ------------------------------------------------ */}
    {/* Error Message Section */}
    {/* ------------------------------------------------ */}
    <View style={[styles.errorMessageContainer, {marginVertical: error? 5 : 0}]}>

        {/* Icon */}
        {error && <Icons
            icon={icons.MaterialIcons}
            iconName={'info-outline'}
            iconSize={15}
            iconColor={COLORS.primary}
        />}

        {/* Message */}
        <Text style={styles.errorText}>
            {error? (!data? errorMessageCaseEmpty : errorMessageDataValidity) : ''}
        </Text>

    </View>
</>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.default,
    },
    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    input: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        fontFamily: 'RH-Regular',
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 50,
        zIndex: 1,
    },
    errorMessageContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontFamily: 'RH-Medium',
        fontSize: 12,
        color: COLORS.primary,
        marginLeft: 5
    },
    label: {
        paddingHorizontal: 10,
        fontFamily: 'RH-Medium',
        fontSize: 15,
        zIndex: 1,
    },
    labelContainer: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelBg: {
        width: '100%',
        height: 20,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: -20,
        borderRadius: 5,
    }
})