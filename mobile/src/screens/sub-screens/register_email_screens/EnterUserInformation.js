import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { useNavigation } from '@react-navigation/native'

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

    </View>
  )
}

const styles = StyleSheet.create({})