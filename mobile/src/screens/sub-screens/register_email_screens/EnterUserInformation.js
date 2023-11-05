import { Pressable, StyleSheet, Text, View, ViewComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import NewInput from '../../../components/components_LogIn/NewInput'
import * as Linking from "expo-linking";
import { api_url } from '../../../constants/api'
import axios from 'axios'
import { Get, Save } from '../../../helper/store'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setRefreshToken, setToken } from '../../../redux/slices/userSlice'
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EnterUserInformation() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [testData, setTestData] = useState('')

  const [submit, setSubmit] = useState(false)
  const [focus, setFocus] = useState(false)

  // ----------------------------------------------------------------------------------------------- First Name Input Value
  const [inputDataFN, setInputDataFN] = useState('')
  const [checkSuccessFN, setCheckSuccessFN] = useState(false)

  // ----------------------------------------------------------------------------------------------- Last Name Input Value
  const [inputDataLN, setInputDataLN] = useState('')
  const [checkSuccessLN, setCheckSuccessLN] = useState(false)

  // -------------------------------------------------------------------- handle extern Submit
  // Send Link Button
  const handleSendLink = () => {
    setSubmit(true)
    setTimeout(() => {
      setSubmit(false)
    }, 300)
  }

  // Leave Input Layout First Name
  const handleLeaveFocus = () => {
    setFocus(false)
    setTimeout(() => {
      setFocus(true);
    }, 300)
  }
  
  const url = Linking.useURL()
  useEffect(() => {
    if (url) {
      const { hostname, path, queryParams } = Linking.parse(url);
      console.log(queryParams)
      if (queryParams.error == 'expired') {
        alert('Loi het han link')
      } 
      else {
        if (queryParams.email && queryParams.email != testData) setTestData(queryParams.email)
      } 
    }
  }, [url])

  // handle Server Request
  useEffect(() => {
    if (checkSuccessFN && checkSuccessLN == true) {
      console.log('send request')
      handleSubmit()
    }
  }, [checkSuccessFN && checkSuccessLN])
  
  const handleSubmit = async () => {
    const api = api_url + 'user/register'
    try {
      const response = await axios.post(api, {
        first_name: inputDataFN,
        last_name: inputDataLN,
        email: testData,
      })
      // success
      // Luu thong tin
      console.log(response.data.data);
      dispatch(setLoggedIn())
      // dispatch(setToken(response.data.data.accessToken))
      // dispatch(setRefreshToken(response.data.data.refreshToken))
      Save("accessToken", response.data.data.accessToken)
      //console.log(Get("accessToken"))
      // Save("refreshToken", response.data.data.refreshToken)
      // Save("email", response.data.data.userData.email)
      // Save("phone", response.data.data.userData.phone)
      // Save("id", response.data.data.userData.id)
      // ------
      // set log ing lai di
      console.log('sucess')
      navigation.navigate('Onboard')
      // nhay vao cai nao day 
    } catch (error) {
      console.log(error)
    }
  }
  


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white}}>
  
    {/* -------------------------------------------------------------------- onLeaveLayout - Background Pressable */}
    <Pressable 
      style={{
        height: height, 
        width: width, 
        zIndex: 1, 
        position: 'absolute',
      }} 
      onTouchStart={handleLeaveFocus} 
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
          {/* <Text style={styles.subHeaderStyle}>Anmeldung erfolgreich!</Text> */}
          <Text style={styles.infoText}>Vervollständige noch einige Angaben zu deinem {"\n"}Profil, um die Anmeldung abzuschließen!</Text>
        </View>

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Input Section */}
        <NewInput 

          style={{
            marginTop: 20,
          }}

          // State
          // submitState={submit}

          // show: Button / Icon
          lock

          // error Message
          errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
          errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}

          // constant
          checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
          label={'E-Mail'}

          // handle
          onLeaveInput={() => null}
          onFocusInput={() => null}

          fixData={testData}
          isEditable={false}

        />

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Input First Name */}
        <NewInput 

          style={{
            marginTop: 10,
          }}

          // State
          submitState={submit}
          focusState={focus}

          // show: Button / Icon
          clearButton

          // error Message
          errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
          errorMessageDataValidity={'Name darf nur aus Buchstaben bestehen!'}

          // constant
          checkAlgorithm={/^[a-zA-Z ]+$/}
          label={'Vorname'}

          // handle
          onLeaveInput={() => null}
          onFocusInput={() => null}

          isEditable={true}

          checkSuccess={() => setCheckSuccessFN(true)}
          checkFailed={() => setCheckSuccessFN(false)}

          setInputData={setInputDataFN}

        />

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Input Last Name */}
        <NewInput 

          style={{
            marginTop: 0,
          }}

          // State
          submitState={submit}
          focusState={focus}

          // show: Button / Icon
          clearButton

          // error Message
          errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
          errorMessageDataValidity={'Name darf nur aus Buchstaben bestehen!'}

          // constant
          checkAlgorithm={/^[a-zA-Z ]+$/}
          label={'Nachname'}

          // handle (Extern UI)
          onLeaveInput={() => null}
          onFocusInput={() => null}

          isEditable={true}

          checkSuccess={() => setCheckSuccessLN(true)}
          checkFailed={() => setCheckSuccessLN(false)}

          setInputData={setInputDataLN}

        />

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Check Box Section */}
        {/* Werbe Berechtigung */}
        <View style={[styles.checkBoxContainer, {marginTop: 8}]}>
            <CheckBox/>
            <View style={{width: width-100}}>
              <Text style={[styles.h5]}>Ich möchte über Neuigkeiten, Angebote sowie Aktionen per E-Mail informiert werden. Mir ist bewusst, dass diese Zustimmung jederzeit in der App-Einstellung oder über den Abmeldelink im Newsletter wiederufen werden kann.</Text>
              <Text style={styles.noticeText}>Mehr Informationen</Text>
            </View>
        </View>

        {/* Nutzungs- und Verkaufsbedingungen */}
        <View style={[styles.checkBoxContainer]}>
            <CheckBox/>
            <View style={{width: width-110}}>
              <Text style={[styles.h5]}>Ich habe die Nutzungs- und Verkaufsbedingungen der Gooyi Platform gelesen und akzeptiere sie.</Text>
              <Text style={styles.noticeText}>Erforderlich, um fortzufahren!</Text>
            </View>
        </View>

        {/* Datenverarbeitung */}
        <View style={[styles.checkBoxContainer]}>
            <CheckBox/>
            <View style={{width: width-100}}>
              <Text style={[styles.h5]}>Mir ist bekannt, dass meine Daten in Übereinstimmung mit der Datenschutzerklärung von Gooyi verarbeitet werden.</Text>
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
            bottom: 30,
            zIndex: 2,
        }}                
        titleStyle={{
            color: COLORS.white, 
            fontFamily: 'Roboto-Medium',
        }}

        // Call handle
        onPress={handleSendLink}
        //handleSendLink
        />

    </Pressable>

    </View>
  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  headerContainer: {
    width: width-60,
    marginHorizontal: 30,
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
    fontFamily: 'RH-Medium',
    color: COLORS.black,
    fontSize: 15,
  },

  h5: {
    fontFamily: 'RH-Regular',
    fontSize: 14,
    color: COLORS.black,
  },

  checkBoxContainer: {
    width: width-60,
    marginHorizontal: 30,
    flexDirection: 'row',
    zIndex: 2,
    marginTop: 15,
    backgroundColor: COLORS.grey02,
    borderRadius: 16,
    padding: 10
  },

  noticeText: {
    fontFamily: 'RH-Bold',
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 5,
  }
})