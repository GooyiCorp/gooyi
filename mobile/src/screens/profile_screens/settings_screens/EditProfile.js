import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// Constant
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import { H3 } from '../../../constants/text-style'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Helpers
import Request from '../../../helper/request.js'
// Redux
import { useSelector } from 'react-redux'
// Components

import SettingInput from '../../../components/components_profile_screen/SettingInput'
import SettingHeader from '../../../components/components_navigation/SettingHeader.js'


export default function EditProfile({
}) {

  const navigation = useNavigation()

    // ----------------------------------------------------------------------------------------------- First Name Input Value
    const [submitFN, setSubmitFN] = useState(false)
    const [focusFN, setFocusFN] = useState(false)
    const [inputDataFN, setInputDataFN] = useState('')
    const [inputDataLN, setInputDataLN] = useState('')

    const [editable, setEditable] = useState(false)
    const accessToken = useSelector(state => state.user.accessToken)
    const handleSave = async () => {
      setEditable(false)
      const response = await Request('user/profile/update', 'put', {first_name: inputDataFN, last_name: inputDataLN}, accessToken)
      console.log(response);
      // Duc anh : thong bao success hay loi ? , xem response.success
    }
 
  return (
    <View style={styles.screen}>

      <SettingHeader 
        onPressClose={() => navigation.goBack()}
        close
        buttonText1={'Bearbeiten'}
        buttonText2={'Abbrechen'}
        editButton
        onPressEdit={() => setEditable(!editable)}
        onPressSave={handleSave}
      />

      <View>
        {/* Label */}
        <Text style={[H3, {marginHorizontal: 30, marginBottom: 20}]}>Persönliche Daten</Text>
        {/* Input Box */}
        <SettingInput 
          clearButton={editable}
          isEditable={editable}
          lock={!editable}
          setInputData={setInputDataFN}
          checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
          label={'Vorname'}
          // error Message
          errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
          errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}
        />

        <SettingInput 
          clearButton={editable}
          isEditable={editable}
          lock={!editable}
          setInputData={setInputDataLN}
          checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
          label={'Nachname'}
          // error Message
          errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
          errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}
        />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    h2: {
      fontFamily: 'RH-Bold',
      fontSize: 20,
      color: COLORS.grey,
      paddingHorizontal: 30,
      marginTop: 15,
      marginBottom: 20,
    },


})