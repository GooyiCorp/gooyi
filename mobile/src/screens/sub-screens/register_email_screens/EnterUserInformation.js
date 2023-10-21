import { Pressable, StyleSheet, Text, View, ViewComponent } from 'react-native'
import React, { useState } from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { useNavigation } from '@react-navigation/native'
import InputBox from '../../../components/components_LogIn/InputBox'
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import BigButton from '../../../components/components_LogIn/BigButton'
import CheckBox from '../../../components/components_universal/CheckBox'

export default function EnterUserInformation() {
    const navigation = useNavigation()

    const [hideKeyboard, setHideKeyboard] = useState(true)

 // ----------------------------------------------------------------------------------------------- First Name Input
 const [emailInputData, setEmailInputData] = useState('');
 const [emailError, setEmailError] = useState(false)
 const [exitEmailInput, setExitEmailInput] = useState(true)
 const emailErrorFeedback = useSharedValue(0)
 
// -------------------------------------------------------------------- handle onChangeText
const onChangeTextEmailInput = (e) => {
 setEmailError(false)
 setEmailInputData(e)
 hideErrorMessageEmailInput()
}

  // show Error Message
  const handleErrorMessageEmailInput = () => {
   setEmailError(true)
   emailErrorFeedback.value = 1
 }

 // hide Error Message
 const hideErrorMessageEmailInput = () => {
   setEmailError(false)
   emailErrorFeedback.value = 0
 }

const handleCheckEmail = () => {
 // Case 1: Data = null -> (return Error Message)
 if (!firstNameInputData) {
   handleErrorMessageFirstNameInput()
   setTimeout(() => {
     setExitEmailInput(true)
   }, 300)
   return; 
 } 

 // Case 3: no Error -> (send request)
   // hide Error Message 
   hideErrorMessageFirstNameInput()
}

const emailErrorMessage = useAnimatedStyle(() => {
 return {
   opacity: emailErrorFeedback.value,
   transform: [
     {scale: emailErrorFeedback.value}
   ],
   margin: interpolate(emailErrorFeedback.value, [0,1], [0,10]),
   paddingVertical: interpolate(emailErrorFeedback.value, [0,1], [0,5])
 }
})

const handleOnFocusEmailInput = () => {
}
    
    // ----------------------------------------------------------------------------------------------- First Name Input
    const [firstNameInputData, setFirstNameInputData] = useState('');
    const [firstNameError, setFirstNameError] = useState(false)
    const [exitFirstNameInput, setExitFirstNameInput] = useState(true)
    const firstNameErrorFeedback = useSharedValue(0)
    
  // -------------------------------------------------------------------- handle onChangeText
  const onChangeTextFirstNameInput = (e) => {
    setFirstNameError(false)
    setFirstNameInputData(e)
    hideErrorMessageFirstNameInput()
  }

     // show Error Message
     const handleErrorMessageFirstNameInput = () => {
      setFirstNameError(true)
      firstNameErrorFeedback.value = 1
    }

    // hide Error Message
    const hideErrorMessageFirstNameInput = () => {
      setFirstNameError(false)
      firstNameErrorFeedback.value = 0
    }

  // Check Data Validity - First Name
  const checkName = () => {  
    const regName = /^[a-zA-Z ]+$/ 
    if (!regName.test(firstNameInputData)) return false
    return true   
  }

  const handleCheckFirstName = () => {
    // Case 1: Data = null -> (return Error Message)
    if (!firstNameInputData) {
      handleErrorMessageFirstNameInput()
      setTimeout(() => {
        setExitFirstNameInput(true)
      }, 300)
      return; 
    } 

    // Case 2: Data, CheckEmail = failed -> (return Error Message)
    else if (!checkName()) {
      handleErrorMessageFirstNameInput()
      setTimeout(() => {
        setExitFirstNameInput(true)
      }, 300)
      return;
    }

    // Case 3: no Error -> (send request)
      // hide Error Message 
      hideErrorMessageFirstNameInput()
  }

  const firstNameErrorMessage = useAnimatedStyle(() => {
    return {
      opacity: firstNameErrorFeedback.value,
      transform: [
        {scale: firstNameErrorFeedback.value}
      ],
      margin: interpolate(firstNameErrorFeedback.value, [0,1], [0,10]),
      paddingVertical: interpolate(firstNameErrorFeedback.value, [0,1], [0,5])
    }
  })

  const handleOnFocusFirstNameInput = () => {
    //setHideKeyboard(false)
    setExitFirstNameInput(false)
    setTimeout(() => {
      setExitLastNameInput(true)
    }, 100)
  }

  // ----------------------------------------------------------------------------------------------- Last Name Input
  const [lastNameInputData, setLastNameInputData] = useState('');
  const [lastNameError, setLastNameError] = useState(false)
  const [exitLastNameInput, setExitLastNameInput] = useState(true)
  const lastNameErrorFeedback = useSharedValue(0)

  // -------------------------------------------------------------------- handle onChangeText
  const onChangeTextLastNameInput = (e) => {
    setLastNameError(false)
    setLastNameInputData(e)
    hideErrorMessageLastNameInput()
  }

    // show Error Message
    const handleErrorMessageLastNameInput = () => {
      setLastNameError(true)
      lastNameErrorFeedback.value = 1
    }

    // hide Error Message
    const hideErrorMessageLastNameInput = () => {
      setLastNameError(false)
      lastNameErrorFeedback.value = 0
    }

  // Check Data Validity - First Name
  const checkLastName = () => {  
    const regLastName = /^[a-zA-Z ]+$/ 
    if (!regLastName.test(lastNameInputData)) return false
    return true   
  }

  const handleCheckLastName = () => {
    // Case 1: Data = null -> (return Error Message)
    if (!lastNameInputData) {
      handleErrorMessageLastNameInput()
      setTimeout(() => {
        setExitLastNameInput(true)
      }, 300)
      return; 
    } 

    // Case 2: Data, CheckEmail = failed -> (return Error Message)
    else if (!checkLastName()) {
      handleErrorMessageLastNameInput()
      setTimeout(() => {
        setExitLastNameInput(true)
      }, 300)
      return;
    }

    // Case 3: no Error -> (send request)
      // hide Error Message 
      hideErrorMessageLastNameInput()
  }

  const lastNameErrorMessage = useAnimatedStyle(() => {
    return {
      opacity: lastNameErrorFeedback.value,
      transform: [
        {scale: lastNameErrorFeedback.value}
      ],
      margin: interpolate(lastNameErrorFeedback.value, [0,1], [0,10]),
      paddingVertical: interpolate(lastNameErrorFeedback.value, [0,1], [0,5])
    }
  })

  const handleOnFocusLastNameInput = () => {
    //setHideKeyboard(false)
    setExitLastNameInput(false)
    setTimeout(() => {
      setExitFirstNameInput(true)
    }, 100)
  }


  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white}}>
  
    {/* --------------------------------------------------------------------  handle onBlur Input */}
    <Pressable 
      style={{height: height, width: width, zIndex: 1, position: 'absolute'}} 

      // handle Exit Input Box
      onTouchStart={() => {setHideKeyboard(true), setExitFirstNameInput(true), setExitLastNameInput(true)}} 
    > 

        {/* -------------------------------------------------------------------- Go Back Button */}
        <RoundButton
        icon={icons.Ionicons}
        iconName={'md-chevron-back'}
        iconSize={moderateScale(28,0.2)}
        iconColor={COLORS.white}
        style={{
            backgroundColor: COLORS.grey,
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            marginLeft: 30,
            marginTop: 60,
            zIndex: 2,
        }}
        onPressButton={() => navigation.navigate('Main')}
        />

        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Profilangaben</Text>
          <Text style={styles.subHeaderStyle}>Anmeldung erfolgreich!</Text>
          <Text style={styles.infoText}>Vervollständige noch einige Angaben zu deinem Profil, {"\n"}um die Anmeldung abzuschließen!</Text>
        </View>

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Input Section */}
        <View style={styles.inputContainer}>
          <InputBox 
            label={'E-Mail'}
            style={{
              zIndex:2,
              marginBottom: 30
            }}
            error={emailError}
            setInputData={setEmailInputData}
            onChangeText={onChangeTextEmailInput}
            exitInput={exitEmailInput}
            onSubmit={handleCheckEmail}
            onFocusInput={()=>{}}
            onLeaveFocus={() => {setExitEmailInput(true)}}
            deleteError={hideErrorMessageEmailInput}
            //hideKeyboard={hideKeyboard}
            isEditable={false}
            fixData={'return.email@gmail.com'}
            lock
          />

          {/* -------------------------------------------------------------------- Input Box: First Name */}
          <InputBox 
            label={'Vorname'}
            style={{
              zIndex:2
            }}
            error={firstNameError}
            setInputData={setFirstNameInputData}
            onChangeText={onChangeTextFirstNameInput}
            exitInput={exitFirstNameInput}
            onSubmit={handleCheckFirstName}
            onFocusInput={handleOnFocusFirstNameInput}
            onLeaveFocus={() => {setExitFirstNameInput(true)}}
            deleteError={hideErrorMessageFirstNameInput}
            hideKeyboard={hideKeyboard}
            isEditable={true}
            clearButton
          />

          {/* -------------------------------------------------------------------- Error Message: First Name */}
          <Animated.View style={[styles.errorContainer, firstNameErrorMessage]}>
            <Text style={styles.error}>
              {firstNameError && firstNameInputData? 'Name darf nur aus Buchstaben bestehen!' : 'Das Feld darf nicht leer sein!'}
            </Text>
          </Animated.View>

          {/* -------------------------------------------------------------------- Input Box: First Name */}
          <InputBox 
            label={'Nachname'}
            style={{
              zIndex:2
            }}
            error={lastNameError}
            setInputData={setLastNameInputData}
            onChangeText={onChangeTextLastNameInput}
            exitInput={exitLastNameInput}
            onSubmit={handleCheckLastName}
            onFocusInput={handleOnFocusLastNameInput}
            onLeaveFocus={() => {setExitLastNameInput(true)}}
            deleteError={hideErrorMessageLastNameInput}
            isEditable={true}
            clearButton
          />

          {/* -------------------------------------------------------------------- Error Message: First Name */}
          <Animated.View style={[styles.errorContainer, lastNameErrorMessage]}>
            <Text style={styles.error}>
              {lastNameError && lastNameInputData? 'Name darf nur aus Buchstaben bestehen!' : 'Das Feld darf nicht leer sein!'}
            </Text>
          </Animated.View>

        </View>

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Check Box Section */}
        {/* Werbe Berechtigung */}
        <View style={[styles.checkBoxContainer, {marginTop: 8}]}>
            <CheckBox/>
            <View style={{width: width-100}}>
              <Text style={[styles.infoText, {marginTop: 6}]}>Ich möchte über Neuigkeiten, Angebote sowie Aktionen per E-Mail informiert werden. Mir ist bewusst, dass diese Zustimmung jederzeit in der App-Einstellung oder über den Abmeldelink im Newsletter wiederufen werden kann.</Text>
              <Text style={styles.noticeText}>Mehr Informationen</Text>
            </View>
        </View>

        {/* Nutzungs- und Verkaufsbedingungen */}
        <View style={[styles.checkBoxContainer]}>
            <CheckBox/>
            <View style={{width: width-100}}>
              <Text style={[styles.infoText, {marginTop: 6}]}>Ich habe die Nutzungs- und Verkaufsbedingungen der Gooyi Platform gelesen und akzeptiere sie.</Text>
              <Text style={styles.noticeText}>Erforderlich, um fortzufahren!</Text>
            </View>
        </View>

        {/* Datenverarbeitung */}
        <View style={[styles.checkBoxContainer]}>
            <CheckBox/>
            <View style={{width: width-100}}>
              <Text style={[styles.infoText, {marginTop: 6}]}>Mir ist bekannt, dass meine Daten in Übereinstimmung mit der Datenschutzerklärung von Gooyi verarbeitet werden.</Text>
              <Text style={styles.noticeText}>Mehr erfahren</Text>
            </View>
        </View>

        {/* -------------------------------------------------------------------- Open Mail App */}
        <BigButton

        // Base
        title={'Speichern'}
        bgStyle={{
            backgroundColor: COLORS.primary,
            position: 'absolute',
            bottom: 30
        }}                
        titleStyle={{
            color: COLORS.white, 
            fontFamily: 'Roboto-Medium',
        }}

        // Call handle
        onPress={() => console.log('open Mail App')}
        
        />

    </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({

  headerContainer: {
    width: width-60,
    marginHorizontal: 30,
    //paddingBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.subPrimary02
  },

  title: {
    fontFamily: 'RH-Black', 
    fontSize: moderateScale(30,0.2), 
    color: COLORS.primary,
    lineHeight: 44,
    marginTop: 15,
    // textAlign: 'center'
  },

  subHeaderStyle: {
    marginTop: 10,
    fontFamily: 'RH-Bold',
    color: COLORS.black,
    fontSize: 15,
    // textAlign: 'center'
  },

  infoText: {
    marginTop: 10,
    fontFamily: 'RH-Regular',
    fontSize: 14,
  },

  inputContainer: {
    width: width-60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    zIndex: 2
  },

  error: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: COLORS.primary
  },

  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 50,
    backgroundColor: COLORS.primary02,
  },

  checkBoxContainer: {
    width: width-60,
    marginHorizontal: 30,
    flexDirection: 'row',
    zIndex: 2,
    marginTop: 15
  },

  noticeText: {
    fontFamily: 'RH-Bold',
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 5,
  }
})