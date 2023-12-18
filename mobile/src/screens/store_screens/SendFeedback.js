import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H1, H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
// Redux
import { useDispatch } from 'react-redux'
import { setShowLeaveScreenAlert, setShowMessageSendAlert } from '../../redux/slices/sendFeedbackSlice'
import { setPage } from '../../redux/slices/mainNavSlice'
// Components
import SettingHeader from '../../navigation/navigationComponents/SettingHeader'
import BigButton from '../../components/components_LogIn/BigButton'
import Icons, { icons } from '../../components/components_universal/Icons'
import RoundButton from '../../components/components_universal/RoundButton'
import LeaveScreenAlert from '../../components/components_stores_screen/send_feedback/LeaveScreenAlert'
import MessageSendAlert from '../../components/components_stores_screen/send_feedback/MessageSendAlert'


// ----------------------------------------------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------------------------------------------
export default function SendFeedback({navigation , navigation: {goBack}}) {

  // Redux
  const dispatch = useDispatch()

  // Input State
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  // Input Clear Button
  const handleClearButton = () => {
    setMessage('')
    Keyboard.dismiss()
    setError(false)
  } 
  // Send Message Button 
  const handleSendMessage = () => {
    if (!message) {
      setError(true)
    } else {
      console.log('send message!')
      dispatch(setShowMessageSendAlert())
    }
  }
  // Enter Text Input
  const handleOnChangeText = (e) => {
    setMessage(e)
    setError(false)
  }
  // handle Go Back Button
  const handleGoBack = () => {
    Keyboard.dismiss()
    if (message) {
      dispatch(setShowLeaveScreenAlert())
    } else {
      goBack()
    }
  }
  // handle Leave Alert Button
  const handleLeaveAlert = () => {
    setMessage('')
    goBack()
  }

  const handleBackHome = () => {
    setMessage('')
    dispatch(setPage('discover'))
    navigation.navigate('Main')
  }

// ----------------------------------------------------------------------------------------------------------------
// RETURN
// ----------------------------------------------------------------------------------------------------------------
return (
  <View style={styles.card}>
    <MessageSendAlert handleLeave={handleBackHome}/>
    <LeaveScreenAlert handleLeaveButton={handleLeaveAlert}/>
    {/* Background Touch */}
    <Pressable 
      style={{
        height: height, 
        width: width, 
      }} 
      onPress={() => Keyboard.dismiss()} 
    >
    {/* Header Back Button */}
    <SettingHeader
      goBack
      onPressGoBack={handleGoBack}
      header
      headerText={'Feedback'}
      iconStyle={COLORS.mainBackground}
    />
    {/* ------------------------------------------------------------------------------- Main Section */}
    <View style={{paddingHorizontal: 30}}>
      {/* Header Title Text  */}
      {/* <Text style={[H1]}>Feedback</Text> */}
      <Text style={[T1, {marginVertical: 10}]}>Hast du Anregungen oder Vorschläge wie wir unsere Servive noch weiter verbessern können? Wir freuen uns auf deine Nachricht.</Text>
      {/* ------------------------------------------------ */}
      {/* Input Top Bar */}
      {/* ------------------------------------------------ */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 10}}>
      {/* Address */}
      <View style={[styles.addressBar]}>
        <Text style={[T2, {color: COLORS.grey}]}>An: <Text style={{fontFamily: 'RH-Bold', color: COLORS.grey}}>Dat Backhus</Text></Text>
      </View>
      {/* Clear Button */}
      {message && <RoundButton
        icon={icons.Ionicons}
        iconName={'close'}
        iconSize={30}
        iconColor={COLORS.grey}
        style={{
            backgroundColor: COLORS.ivoryDark2,
            margin: 0,
            marginBottom: 10,
            borderRadius: 10,
            height: 34,
            width: 34,
        }}
        onPressButton={handleClearButton}
      />}
      </View>
      {/* ------------------------------------------------ */}
      {/* Input Box */}
      {/* ------------------------------------------------ */}
      <View style={[styles.inputContainer]}>
      {/* Input */}
      <TextInput 
        value={message}
        onChangeText={handleOnChangeText}

        placeholder='Gebe deine Nachricht hier ein!'
        placeholderTextColor={COLORS.grey}

        multiline={true}
        maxLength={500}
        numberOfLines={6}

        style={{
            flex: 1,
            fontFamily: 'RH-Regular',
            fontSize: 15,
            paddingHorizontal: 15,
        }}
      />
      </View>
      {/* ------------------------------------------------ */}
      {/* Input Bottom Bar */}
      {/* ------------------------------------------------ */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5}}>
      {/* Error Message */}
      <View style={[styles.errorMessageContainer]}>
        {/* Icon */}
        {error && <Icons
            icon={icons.MaterialIcons}
            iconName={'info-outline'}
            iconSize={15}
            iconColor={COLORS.primary}
        />}
        {/* Message */}
        <Text style={styles.errorText}>
            {error? 'Dieses Feld darf nicht leer sein!' : ''}
        </Text>
      </View>
      {/* Max Input Count */}
      <Text style={[T4, {marginRight: 5}]}>{message.length}/500</Text>
      </View>
    </View>
    {/* ------------------------------------------------ */}
    {/* Send Message Button */}
    {/* ------------------------------------------------ */}
    <BigButton
      title={'Absenden'}
      bgStyle={{
        backgroundColor: COLORS.primary,
        position: 'absolute',
        bottom: 30,
      }}
      titleStyle={{
        color: COLORS.mainBackground,
      }}
      onPress={handleSendMessage}
    />

    </Pressable>
  </View>
)
}

// ----------------------------------------------------------------------------------------------------------------
// STYLE
// ----------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
    justifyContent: 'center'
  },
 
  inputContainer: {
    width: width-60,
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 10,
  },

  addressBar: {
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    backgroundColor: COLORS.ivoryDark2, 
    borderRadius: 16, 
    marginTop: 20,
    marginBottom: 10, 
    justifyContent: 'center',   
    alignItems: 'center',
  },

  errorText: {
    fontFamily: 'RH-Medium',
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 5
  },

  errorMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})