import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../constants/colors'
import InputEmail_ResetPassword from '../../components/components_LogIn/Input_ResetPassword/InputEmail_ResetPassword'
import BigButton from '../../components/universal/Buttons/BigButton'
import { setEmailError_ResetPassword, setShowSendResetPasswordMailSuccessAlert } from '../../redux/slices/resetPasswordSlice'
import { useDispatch, useSelector } from 'react-redux'
import Icons, { icons } from '../../components/universal/Icons/Icons'
import SendResetPasswordMailSuccessAlert from '../../components/components_LogIn/Alert/SendResetPasswordMailSuccessAlert'

export default function ResetPasswordScreen({
  navigation
}) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const emailError = useSelector((state) => state.resetPassword.emailError_ResetPassword)
  // ----------------------------  
  // Check Validity
  // ---------------------------- 
      // Email Check
      const checkEmail = () => {
        const check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            // Case: failed -> Error
            if (!check.test(email)) {
                dispatch(setEmailError_ResetPassword(true))
                return
            } 
            // Case: success -> handle ServerRequest
            else {
                dispatch(setEmailError_ResetPassword(false))
                dispatch(setShowSendResetPasswordMailSuccessAlert())
                return
            }   
    }

    const handleSubmitButton = () => {
      checkEmail()
      // navigation.navigate('ChangePassword')
  }
  return (
    <View style={styles.screen}>
      <SendResetPasswordMailSuccessAlert onPressButton={() => console.log('send Mail')}/>
      <View style={{width: width, paddingHorizontal: 35, marginBottom: 20}}>
        <InputEmail_ResetPassword 
          setInputData={setEmail}
          handleSubmit={checkEmail}
        />
     


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
 </View>

<BigButton 
        label={'Senden'}
        styleContainer={{
            width: '90%'
        }}
        onPress={handleSubmitButton}
    />
    </View>
  )
}

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