import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// Helpers
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T2, T3, T4 } from '../../helper/constants/text'
// Components
import BigButton from '../../components/universal/Buttons/BigButton'
import InputLogIn from '../../components/components_LogIn/Input_LogIn/InputLogIn'
import InputEmail from '../../components/components_LogIn/Input_LogIn/InputEmail'
import InputPassword from '../../components/components_LogIn/Input_LogIn/InputPassword'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailError, setPasswordError } from '../../redux/slices/logInSlice'
import Icons, { icons } from '../../components/universal/Icons/Icons'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LogInScreen() {
// Redux
const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const emailError = useSelector((state) => state.logIn.emailError)
    const [password, setPassword] = useState('')
    const passwordError = useSelector((state) => state.logIn.passwordError)
 
    // ----------------------------  
    // Check Validity
    // ---------------------------- 
        // Email Check
        const checkEmail = () => {
            const check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                // Case: failed -> Error
                if (!check.test(email)) {
                    dispatch(setEmailError(true))
                    return
                } 
                // Case: success -> handle ServerRequest
                else {
                    dispatch(setEmailError(false))
                    return
                }   
        }
        // Password Check
        const checkPassword = () => {
                if (!password) {
                    dispatch(setPasswordError(true))
                    return
                } 
                else {
                    dispatch(setPasswordError(false))
                    return
                }   
        }
    
    const handleLeaveInput = () => {
        Keyboard.dismiss()
    }
    const handleSubmitButton = () => {
        checkEmail()
        checkPassword()
    }
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>
    <Pressable 
        style={{
            height: height, 
            width: width, 
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30
        }} 
        onPress={handleLeaveInput} 
    >
    <View style={{width: width, paddingHorizontal: 35, marginBottom: 20}}>
        <InputEmail
            setInputData={setEmail}
            handleSubmit={checkEmail}
        />
        <InputPassword 
            setInputData={setPassword}
            handleSubmit={checkPassword}
        />
        <Text style={{alignSelf: 'flex-end', fontFamily: 'RH-Medium', color: COLORS.grey, marginVertical: 3, fontSize: 14}}>Passwort vergessen?</Text>
    {/* ------------------------------------------------ */}
    {/* Error Message Section */}
    {/* ------------------------------------------------ */}
    <View>
        {emailError ? 
            <View style={styles.errorMessageContainer}>
                <Icons
                    icon={icons.MaterialIcons}
                    iconName={'info-outline'}
                    iconSize={15}
                    iconColor={COLORS.primary}
                />
                <Text style={styles.errorText}>{!email? 'E-Mail Adresse darf nicht leer sein!' : 'Die eingegebene E-Mail Addresse ist ungültig!'}</Text>
            </View>
        : null}
        {passwordError ? 
            <View style={styles.errorMessageContainer}>
                <Icons
                    icon={icons.MaterialIcons}
                    iconName={'info-outline'}
                    iconSize={15}
                    iconColor={COLORS.primary}
                />
                <Text style={styles.errorText}>Password darf nicht leer sein!</Text>
            </View>
        : null}

    </View>
    </View>
    <BigButton 
        label={'Anmelden'}
        styleContainer={{
            width: '90%'
        }}
        onPress={handleSubmitButton}
    />
    </Pressable>
</View>
)
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 30,
    },

    errorMessageContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },

    errorText: {
        fontFamily: 'RH-Medium',
        fontSize: 12,
        color: COLORS.primary,
        marginLeft: 5
    },

})