import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { moderateScale } from '../../helper/scale'
import BigButton from '../../components/components_LogIn/BigButton'
import { useNavigation } from '@react-navigation/native'
import { H1, T1, T2, T4 } from '../../constants/text-style'

export default function LogIn({}) {
    const navigation = useNavigation()
  return (
    <View style={styles.mainCard}>

        <View style={{width: width-60, height: width-60, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/foxLogIn.png')} resizeMode='contain' style={{maxWidth: '110%'}}/>
        </View>
               
        <Text style={[H1, {textAlign: 'center', marginRight: 100}]}>Ready to</Text>
        <Text style={[H1, {fontSize: 50, marginTop: -15, textAlign: 'center'}]}>goooooooyi?</Text>
        
        <Text style={[T1, {marginTop: 10, textAlign:'center', marginBottom: 20}]}>Wähle eine der folgenden Optionen aus, {"\n"}um zu starten!</Text>

        <BigButton 
            title={'Mit E-Mail Anmelden'} 
            bgStyle={{backgroundColor: COLORS.primary, maxWidth: '100%', borderRadius: 16}}
            titleStyle={{color: COLORS.white, fontFamily: 'RH-Medium'}}
            onPress={() => navigation.navigate('RegisterEmail')}
        />
        <BigButton 
            title={'Mit Telefonnumer Anmelden'}
            bgStyle={{backgroundColor: COLORS.ivoryDark, maxWidth: '100%', borderRadius: 16}}
            titleStyle={{color: COLORS.black, fontFamily: 'RH-Medium'}}
        />

        <Text style={[T4, {marginBottom: 80, marginTop: 20, textAlign: 'center'}]}>Über die Speicherung und Verarbeitung personenbezogener Daten findest du in unsere <Text onPress={() => console.log('press Datenschutz')} style={[T4, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>Datenschutzerklärung</Text> alle wichtige Erläuterungen. Bitte liest Sie sorgfältig durch!</Text>
        
    </View>

  )
}

const styles = StyleSheet.create({

    mainCard: {
        width: width,
        height: height,
        backgroundColor: COLORS.mainBackground,
        padding: 30,
        justifyContent: 'flex-end',
    },
    
})