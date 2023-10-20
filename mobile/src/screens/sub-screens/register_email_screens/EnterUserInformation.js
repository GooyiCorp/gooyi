import { StyleSheet, Text, View, ViewComponent } from 'react-native'
import React from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { useNavigation } from '@react-navigation/native'
import InputBox from '../../../components/components_LogIn/InputBox'

export default function EnterUserInformation() {
    const navigation = useNavigation()
  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white}}>

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
            marginTop: 60
        }}
        onPressButton={() => navigation.navigate('Main')}
        />

        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Profilangaben</Text>
          <Text style={styles.subHeaderStyle}>Fast geschafft!</Text>
          <Text style={styles.infoText}>Vervollständige noch einige Angaben zu deinem Profil {"\n"}und anschließend kannst du loslegen!</Text>
        </View>

        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <View style={styles.inputContainer}>
          <InputBox 
            label={'E-Mail'}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

  headerContainer: {
    width: width-60,
    marginHorizontal: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subPrimary02
  },

  title: {
    fontFamily: 'RH-SemiBold', 
    fontSize: moderateScale(35,0.2), 
    color: COLORS.subPrimary,
    lineHeight: 44,
    marginTop: 15,
  },

  subHeaderStyle: {
    marginTop: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
  },

  infoText: {
    marginTop: 10,
    fontFamily: 'Roboto-Light',
    fontSize: 15,
  },

  inputContainer: {
    width: width-60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  }
})