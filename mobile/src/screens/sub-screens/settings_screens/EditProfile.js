import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from '../../../helper/scale'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import NewInput from '../../../components/components_LogIn/NewInput'
import SettingInput from '../../../components/components_profile_screen/SettingInput'


export default function EditProfile({
}) {

  const navigation = useNavigation()

    // ----------------------------------------------------------------------------------------------- First Name Input Value
    const [submitFN, setSubmitFN] = useState(false)
    const [focusFN, setFocusFN] = useState(false)
    const [inputDataFN, setInputDataFN] = useState('')

    const [editable, setEditable] = useState(false)

    const handleSave = () => {
      setEditable(false)
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
        <Text style={styles.h2}>Persönliche Daten</Text>
        {/* Input Box */}
        <SettingInput 
          clearButton={editable}
          isEditable={editable}
          lock={!editable}
          setInputData={() => null}
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
          setInputData={() => null}
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