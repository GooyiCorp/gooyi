import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { moderateScale } from '../../helper/scale'
import BigButton from '../../components/components_LogIn/BigButton'

export default function LogIn({}) {
  return (
    <View style={{ height: height, width: width, backgroundColor: COLORS.white}}>
        {/* <View style={{height: 300, width: 300, backgroundColor: COLORS.default, position: 'absolute', alignSelf: 'center', top: 100, justifyContent: 'center', alignItems: 'center'}}><Text>Image Container</Text></View> */}
        <View style={styles.headerSection}>
            <Text style={styles.title}>Ready {"\n"}to <Text style={{fontFamily: 'Roboto-Bold', fontSize: 48,color: COLORS.primary}}>goooooooyi</Text>?</Text>
            <Text style={styles.subHeaderStyle}>Bereit, loszulegen? {"\n"}{"\n"}Tippe auf eine der folgenden Optionen, um {"\n"}zu starten!</Text>
        </View>

        <BigButton 
            title={'Mit E-Mail Anmelden'} 
            bgStyle={{backgroundColor: COLORS.primary}}
            titleStyle={{color: COLORS.white, fontFamily: 'Roboto-Medium'}}
        />
        <BigButton title={'Mit Telefonnumer Anmelden'}/>

        <Text style={{fontFamily: 'Roboto-Light', fontSize: 11.5, margin: 30}}>In unsere <Text onPress={console.log('press Datenschutz')} style={{fontFamily: 'Roboto-Medium', fontSize: 11, color: COLORS.primary}}>Datenschutzerklärung</Text> findest du alle wichtige Informationen über die Speicherung und Verarbeitung personenbezogener Daten, Bitte liest Sie sorgfältig durch.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Regular', 
        fontSize: moderateScale(45,0.2), 
        lineHeight: 45,
        color: COLORS.subPrimary,
        letterSpacing: 1
    },

    headerSection: {
        width: width,
        //backgroundColor: 'yellow',
        paddingHorizontal: 30,
        marginTop: 0.4*height,
        marginBottom: 40,
    },

    subHeaderStyle: {
        marginTop: 20,
        fontFamily: 'Roboto-Medium',
        fontSize: 15
    }
})