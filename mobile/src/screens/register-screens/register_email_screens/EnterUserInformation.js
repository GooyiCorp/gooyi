
import { Pressable, StyleSheet, Text, View, ViewComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
// Helpers
import { moderateScale } from '../../../helper/scale'
import { Save } from '../../../helper/store'
import Request from '../../../helper/request'
// Constant
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { H3, T1, T3, T4 } from '../../../constants/text-style'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Redux
import { setLoggedIn, setRefreshToken, setToken } from '../../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
// Components
import BigButton from '../../../components/components_LogIn/BigButton'
import CheckBox from '../../../components/components_universal/CheckBox'
import NewInput from '../../../components/components_LogIn/NewInput'
import Icons, { icons } from '../../../components/components_universal/Icons'
import SettingHeader from '../../../components/components_navigation/SettingHeader'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EnterUserInformation({route}) {
  const {email, key} = route.params;
  const navigation = useNavigation()
  const dispatch = useDispatch()

  // -------------------------------------------------------------------------
  // CheckBox State
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)

  // Check 1
  const handleCheck1CaseTrue = (() => {
    setCheck1(true)
  })
  const handleCheck1CaseFalse = (() => {
    setCheck1(false)
  })

  // Check 2
  const handleCheck2CaseTrue = (() => {
    setCheck2(true)
    setErrorCheck2(false)
  })
  const handleCheck2CaseFalse = (() => {
    setCheck2(false)

  })

  // Check 3
  const handleCheck3CaseTrue = (() => {
    setCheck3(true)
    setErrorCheck3(false)
  })
  const handleCheck3CaseFalse = (() => {
    setCheck3(false)
  })

  const [errorCheck2, setErrorCheck2] = useState(false)
  const [errorCheck3, setErrorCheck3] = useState(false)

  // -------------------------------------------------------------------------

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
    handleSubmit()
    check2? setErrorCheck2(false) : setErrorCheck2(true)
    check3? setErrorCheck3(false) : setErrorCheck3(true)
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

  // handle Server Request
  useEffect(() => {
    if (checkSuccessFN && checkSuccessLN && check2 && check3) {
      handleSubmit()
    }
  }, [checkSuccessFN,checkSuccessLN,check2,check3])
  
  const handleSubmit = async () => {
      const response = await Request('user/profile/register', "post", {
        first_name: inputDataFN,
        last_name: inputDataLN,
        email: email,
        key: key,
      })
      // success
      // Luu thong tin
      if (response.success) {
        dispatch(setLoggedIn())
        dispatch(setToken(response.data.accessToken))
        dispatch(setRefreshToken(response.data.refreshToken))
        await Save("accessToken", response.data.accessToken)
        await Save("refreshToken", response.data.refreshToken)
        navigation.navigate('Onboard')
      } else {
        alert(response.message)
      }
  }
  


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.mainBackground}}>
  
    {/* -------------------------------------------------------------------- onLeaveLayout - Background Pressable */}
    <Pressable 
      style={{
        height: height, 
        width: width, 
        zIndex: 1, 
        position: 'absolute',
      }} 
      onPress={handleLeaveFocus} 
    >

        {/* -------------------------------------------------------------------- Go Back Button */}

        <SettingHeader
          goBack
          onPressGoBack={() => navigation.navigate('Main')}
        />

        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <Text style={[H3, {marginHorizontal: 30, marginBottom: 10}]}>Profilangaben</Text>
        <Text style={[T1, {paddingHorizontal: 30}]}>Vervollständige noch einige Angaben zu deinem {"\n"}Profil, um die Anmeldung abzuschließen!</Text>

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Input Section */}
        <View style={styles.termsCondition}>
             
        <NewInput 
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

          fixData={email}
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

          isEditable={true}

          checkSuccess={() => setCheckSuccessLN(true)}
          checkFailed={() => setCheckSuccessLN(false)}

          setInputData={setInputDataLN}

        />

        {/* ------------------------------------------------------------------------------------------------------------------------------------- Check Box Section */}
        {/* Werbe Berechtigung */}

        <View style={[styles.checkBoxContainer]}>
            <CheckBox checkTrue={handleCheck1CaseTrue} checkFalse={handleCheck1CaseFalse}/>
            <View style={{width: width-100}}>
              <Text style={[T3]}>Ich möchte über Neuigkeiten, Angebote sowie Aktionen per E-Mail informiert werden. Mir ist bewusst, dass diese Zustimmung jederzeit in der App-Einstellung oder über den Abmeldelink im Newsletter wiederufen werden kann.</Text>
              <Text style={[T3, {color: COLORS.grey, fontFamily: 'RH-Bold', marginTop: 5}]}>Mehr Informationen</Text>
            </View>
        </View>

        {/* Nutzungs- und Verkaufsbedingungen */}
        <View style={[styles.checkBoxContainer, {backgroundColor: errorCheck2? COLORS.primary02 : 'transparent'}]}>
            <CheckBox checkTrue={handleCheck2CaseTrue} checkFalse={handleCheck2CaseFalse}/>
            <View style={{width: width-110}}>
              <Text style={[T3]}>Ich habe die <Text style={{color: COLORS.primary, fontFamily: 'RH-Bold'}}>Nutzungs- und Verkaufsbedingungen</Text> der Gooyi Platform gelesen und akzeptiere sie.</Text>
            </View>
        </View>

        {/* Error Message Check 2 */}
        {errorCheck2 && <View style={[styles.errorMessageContainer, {marginVertical: errorCheck2? 5 : 0}]}>

        {/* Icon */}
        <Icons
            icon={icons.MaterialIcons}
            iconName={'info-outline'}
            iconSize={15}
            iconColor={COLORS.primary}
        />

        {/* Message */}
        <Text style={styles.errorText}>
            Zustimmung erforderlich!
        </Text>

        </View>}

        {/* Datenverarbeitung */}
        <View style={[styles.checkBoxContainer, {backgroundColor: errorCheck3? COLORS.primary02 : 'transparent'}]}>
            <CheckBox checkTrue={handleCheck3CaseTrue} checkFalse={handleCheck3CaseFalse}/>
            <View style={{width: width-100}}>
              <Text style={[T3]}>Mir ist bekannt, dass meine Daten in Übereinstimmung mit der <Text style={{color: COLORS.primary, fontFamily: 'RH-Bold'}}>Datenschutzerklärung</Text> von Gooyi verarbeitet werden.</Text>
            </View>
        </View>

        {/* Error Message Check 3 */}
        {errorCheck3 && <View style={[styles.errorMessageContainer, {marginVertical: errorCheck3? 5 : 0}]}>

        {/* Icon */}
        <Icons
            icon={icons.MaterialIcons}
            iconName={'info-outline'}
            iconSize={15}
            iconColor={COLORS.primary}
        />

        {/* Message */}
        <Text style={styles.errorText}>
            Zustimmung erforderlich!
        </Text>

        </View>}

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
    width: width-40,
    marginHorizontal: 20,
    flexDirection: 'row',
    padding: 10,
    zIndex: 2,
    //backgroundColor: COLORS.grey02,
    borderRadius: 16,
    // padding: 10
  },

  noticeText: {
    fontFamily: 'RH-Bold',
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 5,
  },

  termsCondition: {
    width: width,
    height: height,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 30,
    marginTop: 20,

    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 7,
  },

  errorMessageContainer: {
    width: width-60,
    marginHorizontal: 40,
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
})