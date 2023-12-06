import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { H1, H3, H4, T1 } from '../../../constants/text-style'
import BigButton from '../../../components/components_LogIn/BigButton'

export default function SendFeedback({navigation: {goBack}}) {
  return (
    <View style={styles.card}>
      <SettingHeader
        close
        onPressClose={() => goBack()}
      />

      {/* Info Text  */}
      <View style={{paddingHorizontal: 20}}>
        <View style={{paddingHorizontal: 10}}>
        <Text style={[H1]}>Feedback</Text>
        <Text style={[T1, {marginTop: 10}]}>Hast du Anregungen oder Vorschläge wie wir unsere Servive verbessern können oder möchtest du uns einfach nur deine Erfahrung mitteilen?</Text>
        <Text style={[T1, {fontFamily: 'RH-Medium', marginTop: 8, marginBottom: 30}]}>Wir freuen uns über jedes Feedback!</Text>
        </View>

        {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginTop: 20}]}>Filter</Text> */}
        
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Gebe deine Nachricht hier ein!'
            placeholderTextColor={COLORS.grey}
                style={{
                    fontFamily: 'RH-Regular',
                    fontSize: 15,
                }}
          />
        </View>

      </View>
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
        />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
  },

  inputContainer: {
    width: width-40,
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 20,

    // borderWidth: 0.5,
    // borderColor: COLORS.borderGrey,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})