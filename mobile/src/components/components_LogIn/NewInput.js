import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import { width } from '../../constants/size'
import RoundButton from '../components_universal/RoundButton'
import Icons, { icons } from '../components_universal/Icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function NewInput({
    
    // extern styling
    style,

    // State
    focusState,
    submitState,

    // hide / show
    clearButton,
    lock,

    // error Message
    errorMessageCaseEmpty,
    errorMessageDataValidity,

    // constant
    checkAlgorithm,
    label,

    // not Editable
    fixData,
    isEditable,

    // check Status
    checkSuccess,
    checkFailed,

    //setExternData
    setInputData,

}) {
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [data, setData] = useState('')

    // Main State
    const [error, setError] = useState(false)
    const [focus, setFocus] = useState(false)

    // Animated Value
    const focusInput = useSharedValue(0)

    // --------------------------------------- Animation
    // Label 
    const labelTransition = useAnimatedStyle(() => {
        const translateY = interpolate(focusInput.value, [0,1], [0,20])
        return {
            transform: [
                {translateY: translateY},
            ]
        }
    })

    const labelContainerTransition = useAnimatedStyle(() => {
        const translateY = interpolate(focusInput.value, [0,1], [0,7])
        const scale = interpolate(focusInput.value, [0,1], [1,0.8])
        return {
            transform: [
                {translateY: translateY},
                {scale: scale},
            ]
        }
    })

    const labelBgTransition = useAnimatedStyle(() => {
        const scaleX = interpolate(focusInput.value, [0,1], [0,1])
        return {
            transform: [
                {scaleX: scaleX},
            ]
        }
    })
   
    // --------------------------------------- Check Validity
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

    // --------------------------------------- handle Clear Button
    const handleClear = () => {
        // clear Data, Errors
        setData('')
        setError(false)
        
        handleOnBlur()
        Keyboard.dismiss()
    }

    // --------------------------------------- handle Focus/Blur
    // onFocus
    const handleOnFocus = () => {
        setFocus(true)
        focusInput.value = withDelay(0, withTiming(1, {duration: 200}))
    }

    // onBlur
    const handleOnBlur = () => {
        setFocus(false)
        data? focusInput.value = 1 : focusInput.value = withDelay(0, withTiming(0, {duration: 200}))
    }

    // --------------------------------------- handle onChangeText
    const handleOnChangeText = (e) => {
        setError(false)
        setData(e)
      }

    // --------------------------------------- handle Press Input Submit
    const handleInputSubmit = () => {
        !data? (setError(true), checkFailed()) : checkValidity()
    }

    // --------------------------------------- handle extern Button
    // Extern Submit
    useEffect(() => {
        // Check extern Submit Button is pressed? if true start intern handle Submit Function
        if (submitState == true) {
            handleInputSubmit()
            Keyboard.dismiss()
        }
    }, [submitState])

    // Extern Pressable Background
    useEffect(() => {
        // Check extern Background Pressable is pressed? if true setFocus to false and hide Keyboard, Check Data for reset Label position
        focusState? null : (setFocus(false), Keyboard.dismiss(), data? null : focusInput.value = withDelay(0, withTiming(0, {duration: 200})))    
    }, [focusState])

    // --------------------------------------- handle Fix Data

    useEffect(() => {
        if (!data) {
            setData(fixData)
        }
        if (fixData) {
            focusInput.value = withDelay(0, withTiming(1, {duration: 200}))
        }
    }, [fixData])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  return (
    <View>

        {/* --------------------------------------- Input Box */}
        <View 
            style={[
                styles.inputContainer,
                {
                    borderColor: isEditable? (error? COLORS.primary : (focus? COLORS.subPrimary : COLORS.borderGrey)) : COLORS.notEditableBorder,
                },
                style
            ]}
        >

            {/* --------------------- Input View */}
            <TextInput style={[styles.input, {color: !isEditable? COLORS.grey : COLORS.black}]}

                // Input Data
                value={data}
                onChangeText={(e) => {setData(e), setInputData(e)}}

                // onFocus/onBlur
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}

                // onChangeText 
                onChange={handleOnChangeText}

                // Pass Data
                onSubmitEditing={handleInputSubmit}

                // Editable
                editable={isEditable}
            />

            {/* --------------------- Right View */}
            <View 
                style={[
                    styles.rightView,
                    {zIndex: focus? 1 : 0}
                ]}
            >

                {/* Clear Button */}
                {clearButton && <RoundButton
                    icon={icons.Ionicons}
                    iconName={'close'}
                    iconSize={30}
                    iconColor={COLORS.subPrimary}
                    style={{
                        backgroundColor: 'transparent',
                        margin: 0,
                        opacity: focus? 1 : 0, 
                        transform: [
                            {scaleX: focus? 1 : 0}
                        ]
                    }}

                    // handle Clear
                    onPressButton={handleClear}
                />}

                {/* Lock Icon */}
                {lock && <Icons 
                    icon={icons.Ionicons}
                    iconName={'ios-lock-closed'}
                    iconSize={20}
                    iconColor={COLORS.borderGrey}
                />}


            </View>
            {/* --------------------- Right View */}
            <Animated.View style={[styles.labelContainer, labelContainerTransition]}>
                <Animated.Text style={[styles.label, {color: isEditable? COLORS.black : COLORS.grey},labelTransition]}>{label}</Animated.Text>
                <Animated.View style={[styles.labelBg, labelBgTransition]}></Animated.View>
            </Animated.View>

        </View>

        {/* --------------------------------------- Error Message */}
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

    </View>
  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    inputContainer: {
        height: 50,
        width: width-60,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.default,
        marginHorizontal: 30,
        // justifyContent: 'space-between',
        // overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },

    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
        zIndex: 2,
    },

    input: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 16,
        fontFamily: 'RH-Regular',
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 50,
        zIndex: 1,
    },

    errorText: {
        fontFamily: 'RH-Medium',
        fontSize: 12,
        color: COLORS.primary,
        marginLeft: 5
    },

    errorMessageContainer: {
        width: width-60,
        marginHorizontal: 40,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
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