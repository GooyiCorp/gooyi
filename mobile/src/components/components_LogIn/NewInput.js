import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import { width } from '../../constants/size'
import RoundButton from '../components_universal/RoundButton'
import Icons, { icons } from '../components_universal/Icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function NewInput({

    // State
    errorState,
    submitState,

    // hide / show
    clearButton,
    lock,

    // error Message
    errorMessageCaseEmpty,
    errorMessageDataValidity,

    checkAlgorithm,

}) {
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [data, setData] = useState('')
    const [error, setError] = useState(false)
    const [focus, setFocus] = useState(false)
    const [submit, setSubmit] = useState(false)

    // Animated Value
    const focusInput = useSharedValue(0)

    // --------------------------------------- Animation
   
    // --------------------------------------- Check Validity
    const checkValidity = () => {
        const check = checkAlgorithm
        if (!check.test(data)) {
            setError(true)
        } else {
            setError(false)
        } 
      }

    // --------------------------------------- handle Clear Button
    const handleClear = () => {
        setData('')
        setError(false)
        setFocus(false)
        //focusInput.value = withTiming(0)

        Keyboard.dismiss()
    }

    // --------------------------------------- handle Clear Button
    const handleOnFocus = () => {
        setFocus(true)
        //focusInput.value = withTiming(1)
    }

    // --------------------------------------- handle onChangeText
    const handleOnChangeText = (e) => {
        setError(false)
        setData(e)
      }

    // --------------------------------------- handle submit
    useEffect(() => {
        // Check Validity when submit is true, return error false or true
        submit? checkValidity() : null
        // Check Error
        if (!error) {
            setFocus(false)
            setSubmit(false)
            Keyboard.dismiss()
        } else {
            console.log('ok')
        }
    }, [submit])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  return (
    <View>

        {/* --------------------------------------- Input Box */}
        <View 
            style={[
                styles.inputContainer,
                {borderColor: error? COLORS.primary : (focus? COLORS.subPrimary : COLORS.default)},
            ]}
        >

            {/* --------------------- Input View */}
            <TextInput style={styles.input}

                // Input Data
                value={data}
                onChangeText={(e) => {setData(e)}}

                // onFocus Input
                onFocus={handleOnFocus}

                // onChangeText 
                onChange={handleOnChangeText}

                // Pass Data
                onSubmitEditing={() => setSubmit(true)}
            />

            {/* --------------------- Right View */}
            <View 
                style={[
                    styles.rightView, 
                    {opacity: focus? 1 : 0}
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
                    }}

                    // handle Clear
                    onPressButton={handleClear}
                />}

                {/* Lock Icon */}
                {lock && <Icons 
                    icon={icons.Ionicons}
                    iconName={'ios-lock-closed-outline'}
                    iconSize={20}
                    iconColor={'#999999'}
                />}


            </View>
            {/* --------------------- Right View */}
            <Animated.View style={[styles.labelContainer]}>
                <Animated.Text style={[styles.label]}>Test</Animated.Text>
                <Animated.View style={[styles.labelBg]}></Animated.View>
            </Animated.View>

        </View>

        {/* --------------------------------------- Error Message */}
        <View style={styles.errorMessageContainer}>

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
        // backgroundColor: COLORS.subPrimary02,
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
    },

    labelContainer: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    labelBg: {
        width: '100%',
        height: 20,
        backgroundColor: COLORS.subPrimary,
        position: 'absolute',
        bottom: -20,
        borderRadius: 5,

    }
})