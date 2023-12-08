import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { H1, H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import BigButton from '../../../components/components_LogIn/BigButton'
import Icons, { icons } from '../../../components/components_universal/Icons'
import RoundButton from '../../../components/components_universal/RoundButton'

export default function SendFeedback({navigation: {goBack}}) {

  const [message, setMessage] = useState('')



  return (
    <View style={styles.card}>
      <Pressable 
      style={{
        height: height, 
        width: width, 
        // zIndex: 1, 
        // position: 'absolute',
        // backgroundColor: 'yellow'
      }} 
      onPress={() => Keyboard.dismiss()} 
    >
      <SettingHeader
        close
        onPressClose={() => goBack()}
      />



      {/* Info Text  */}
      <View style={{paddingHorizontal: 30}}>
        <View style={{marginBottom: 10, marginHorizontal: 0}}>
        <Text style={[H1]}>Feedback</Text>
        <Text style={[T1, {marginVertical: 10}]}>Hast du Anregungen oder Vorschläge wie wir unsere Servive noch weiter verbessern können? Wir freuen uns auf deine Nachricht.</Text>
        
        </View>
        <View style={{}}>
        <View style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor: COLORS.ivoryDark2, alignSelf: 'baseline', borderRadius: 16, marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {/* <Icons
            icon={icons.MaterialCommunityIcons}
            iconName={'email'}
            iconSize={20}
            iconColor={COLORS.mainBackground}
            iconStyle={{
              marginRight: 8,
            }}
          /> */}
          <Text style={[T2, {color: COLORS.grey}]}>An: <Text style={{fontFamily: 'RH-Bold', color: COLORS.grey}}>Dat Backhus</Text></Text>
        </View>

        
        </View>
        {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginTop: 20}]}>Filter</Text> */}
        <View style={styles.inputContainer}>
          <TextInput 
            value={message}
            onChangeText={(e) => setMessage(e)}
            placeholder='Gebe deine Nachricht hier ein!'
            placeholderTextColor={COLORS.grey}
            multiline={true}
            maxLength={200}
            numberOfLines={6}
            style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 40,
                fontFamily: 'RH-Regular',
                fontSize: 15,
            }}
          />

        <RoundButton
                  icon={icons.Ionicons}
                  iconName={'close'}
                  iconSize={30}
                  iconColor={COLORS.grey}
                  style={{
                      backgroundColor: 'transparent',
                      margin: 0,
                      borderRadius: 10,
                      height: 34,
                      width: 34,
                      position: 'absolute',
                      top: 5,
                      right: 5
                  }}

                />

<View style={{position: 'absolute', bottom: 10, right: 15}}>
            <Text style={[T4]}>{message.length}/500</Text>
          </View>
        </View>
          

        {/* <Text style={[T1, {fontFamily: 'RH-Medium', marginTop: 8, marginBottom: 30}]}>Wir freuen uns über jedes Feedback!</Text> */}

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

</Pressable>

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
    width: width-60,
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 5,
    // borderWidth: 0.5,
    // borderColor: COLORS.borderGrey,

  }
})