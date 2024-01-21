import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// Helpers
import { COLORS } from '../../../helper/constants/colors'
// Components
import IconButton from '../../universal/Buttons/IconButton'
import Icons, { icons } from '../../universal/Icons/Icons'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { T4 } from '../../../helper/constants/text'
import { useDispatch, useSelector } from 'react-redux'
import { setPasswordError } from '../../../redux/slices/logInSlice'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function InputPassword({
    handleSubmit,
    setInputData,
}) {
    const dispatch = useDispatch()
    const [data, setData] = useState('')
    const [focus, setFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const error = useSelector((state) => state.logIn.passwordError)

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
                borderColor: error ? COLORS.primary : interpolateColor(focusInput.value, [0,1], [COLORS.ivoryDark2, COLORS.grey])
            }
        })
    // ---- end - Animated Style

    // ----------------------------  
    // Handler Section
    // ---------------------------- 
        // Clear Button Handler
        const handleShowPassword = () => {
            setShowPassword(!showPassword)
            console.log(showPassword)
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
            dispatch(setPasswordError(false))
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
<View style={{width: '100%', marginBottom: 10}}>
    <Animated.Text style={[T4, styles.label, labelTransition]}>Passwort</Animated.Text>

    {/* ------------------------------------------------ */}
    {/* Input Section */}
    {/* ------------------------------------------------ */}
    <Animated.View style={[styles.container, borderTransition]}>
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
            style={styles.input}
            // Text Secure
            secureTextEntry={ showPassword ? true : false }
        />

    </Animated.View>

    {/* ---- start - Right View */}
    <View 
            style={[
                styles.rightView,
            ]}
        >
            {/* Clear Button */}
            <IconButton 
                icon={icons.MaterialCommunityIcons}
                iconName={ showPassword? 'eye-off-outline' : 'eye-outline' }
                iconSize={25}
                iconColor={ COLORS.grey }
                styleContainer={{
                    alignItems: 'flex-end',
                    height: '100%',
                    paddingBottom: 8,
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                }}
                onPress={handleShowPassword}
            />
        </View>
        {/* ---- end - Right View */}

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
        borderColor: COLORS.default,
    },
    rightView: {
        height: 35,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    input: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'yellow',
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