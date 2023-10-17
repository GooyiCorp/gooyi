import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { COLORS } from '../../../index/constantsindex'
import { moderateScale } from '../../../helper/scale'
import { icons } from '../../../components/components_universal/Icons'
import AnimatedSuccessIcon from '../../../components/components_universal/AnimatedSuccessIcon'

export default function CheckEmail({navigation}) {
  return (
    <>
        {/* Go Back Buttom */}
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
        onPressButton={() => navigation.navigate('Register1')}
        />

        

        <Text style={[styles.title]}>Checke deine E-Mails</Text>

        <Text style={styles.subHeaderStyle}>Wir haben dir an deine E-Mail-Adresse einen {"\n"}Link gesendet. Tippe den Link an, um dich anzumelden.</Text>
    </>
  )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: 'RH-Black', 
        fontSize: moderateScale(40,0.2), 
        color: COLORS.subPrimary,
        lineHeight: 44,
        marginHorizontal: 30,
        alignSelf: 'center',
        marginTop: 100,
        textAlign: 'center'
    },
    
    subHeaderStyle: {
        marginTop: 20,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        marginHorizontal: 30,
        alignSelf: 'center',
        textAlign: 'center'
    }

})