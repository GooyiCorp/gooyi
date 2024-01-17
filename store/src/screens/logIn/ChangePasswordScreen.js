import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import InputChangePassword from '../../components/components_LogIn/Input_ChangePassword/InputChangePassword'
import { useDispatch, useSelector } from 'react-redux'
import BigButton from '../../components/universal/Buttons/BigButton'
import { setNotMatchError } from '../../redux/slices/changePasswordSlice'
import Icons, { icons } from '../../components/universal/Icons/Icons'
import ProgressBar from '../../components/universal/ProgressBar/ProgressBar'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ChangePasswordScreen({
  navigation
}) {
  const dispatch = useDispatch()
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [suggestions, setSuggestions] = useState([]); 
  
  const [strength, setStrength] = useState(''); 
  console.log(strength)
  const notMatchError = useSelector((state) => state.changePassword.notMatchError)

  console.log(firstInput)
  const handleLeaveInput = () => {
    Keyboard.dismiss()
}

const validatePassword = (input) => { 
  // ---- start - Password Validity
  let newSuggestions = []; 

    if (input.length < 8) { 
        newSuggestions.push('Password should be at least 8 characters long') 
    } 
    if (!/\d/.test(input)) { 
        newSuggestions.push('Add at least one number') 
    } 
    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) { 
        newSuggestions.push('Include both upper and lower case letters') 
    } 
    if (!/[^A-Za-z0-9]/.test(input)) { 
        newSuggestions.push('Include at least one special character') 
    } 

  setSuggestions(newSuggestions)
  // ---- end - Password Validity
  
  // ---- start - Password Strength
    if (newSuggestions.length === 0) { 
      setStrength('Very Strong'); 
    } 
    else if (newSuggestions.length <= 1) { 
        setStrength('Strong') 
    } 
    else if (newSuggestions.length <= 2) { 
        setStrength('Moderate') 
    } 
    else if (newSuggestions.length <= 3) { 
        setStrength('Weak') 
    } 
    else { 
        setStrength('Sehr schwach') 
    } 
  // ---- end - Password Strength
}

const handleSubmitButton = () => {
  // validatePassword(firstInput)
  if (firstInput == secondInput) {
    console.log('password match')
    // navigation.navigate('ChangePassword')
  } else {
    dispatch(setNotMatchError(true))
  }
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
      <InputChangePassword
        label={'Neues Passwort'}
        setInputData={(e) => (setFirstInput(e), validatePassword(e))}
        showPasswordIndicator
      />
      <InputChangePassword 
        label={'Neues Passwort wiederholen'}
        setInputData={setSecondInput}
      />
                 <ProgressBar 
              barWidth={100}
              barHeight={5}
              maxProgressValue={100}
              progressValue={strength === 'Very Strong' ? 100 : 
              strength === 'Strong' ? 75 : 
              strength === 'Moderate' ? 50 : 
              strength === 'Weak' ? 25 : 0}
              barContainerStyle={{
                alignSelf: 'flex-start',
                marginBottom: 15
              }}
            /> 

      {/* ------------------------------------------------ */}
      {/* Error Message Section */}
      {/* ------------------------------------------------ */}
      {notMatchError ? 
          <View style={styles.errorMessageContainer}>
              <Icons
                  icon={icons.MaterialIcons}
                  iconName={'info-outline'}
                  iconSize={15}
                  iconColor={COLORS.primary}
              />
              <Text style={styles.errorText}>Die angegebenen Passwörter stimmen nicht überein!</Text>
          </View>
      : null}
      
      {/* {suggestions.map((suggestion, index) => ( 
        <Text key={index}> {suggestion}</Text>
      ))}  */}
    </View>
    <BigButton 
        label={'Passwort ändern'}
        styleContainer={{
            width: '90%'
        }}
        onPress={handleSubmitButton}
    />


            {/* <Text style={styles.strengthText}> 
                {strength} 
            </Text>  */}

 

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

  strengthMeter: { 
    width: '40%', 
    height: 8, 
    backgroundColor: COLORS.ivory, 
    marginTop: 10, 
    marginRight: 10,
    borderRadius: 10, 
    overflow: 'hidden', 
    alignSelf: 'flex-end'
}, 

strengthText: { 
fontSize: 12, 
}, 
suggestionsText: { 
  color: 'red', 
}, 
})