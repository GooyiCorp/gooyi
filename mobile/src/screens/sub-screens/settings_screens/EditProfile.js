import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from '../../../helper/scale'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'

export default function EditProfile({
}) {

  const navigation = useNavigation()
  return (
    <View style={styles.screen}>

      <SettingHeader 
          onPressClose={() => navigation.goBack()}
          close
          buttonText1={'Bearbeiten'}
          buttonText2={'Fertig'}
          editButton
      />

    {/* <View style={styles.headerContainer}>  

      <Text style={styles.h2}>Profil bearbeiten</Text>

      <RoundButton
        icon={icons.MaterialIcons}
        iconName={'close'}
        iconSize={moderateScale(22,0.2)}
        iconColor={COLORS.white}
        style={{
          backgroundColor: COLORS.grey,
          height: moderateScale(38,0.2),
          width: moderateScale(38,0.2),
          marginHorizontal: 0,
        }}
        onPressButton={() => navigation.goBack()}
      />
     
    </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    headerContainer: {
      width: width,
      paddingHorizontal: 30,
      paddingTop: 60,
      paddingBottom: 20,
      //backgroundColor: COLORS.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'

    },
  
    h2: {
      fontFamily: 'RH-Bold',
      fontSize: 20,
      color: COLORS.grey,
    },
})