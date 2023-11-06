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
    <View style={{ height: height, width: width, backgroundColor: COLORS.white}}>

        <View style={styles.mainCard}>

        

        {/* <Image source={require('../../../assets/image/foxSlide3.png')} resizeMode='contain' style={{maxWidth: '40%', position: 'absolute'}}/> */}
            

       
        <Text style={[H1, {marginTop: 250}]}>Ready to</Text>
        <Text style={[H1, {fontSize: 50, marginTop: -15}]}>goooooooyi?</Text>

        <Text style={[T1, {fontFamily: 'RH-Bold', marginTop: 20}]}>Anmeldung erforderlich!</Text>
        <Text style={[T1, {marginTop: 10, marginBottom: 30}]}>Tippe auf eine der folgenden Optionen, {"\n"}um loszulegen!</Text>

        <BigButton 
                title={'Mit E-Mail Anmelden'} 
                bgStyle={{backgroundColor: COLORS.primary, maxWidth: '100%', borderRadius: 16}}
                titleStyle={{color: COLORS.white, fontFamily: 'RH-Medium'}}
                onPress={() => navigation.navigate('RegisterEmail')}
            />
            <BigButton 
                title={'Mit Telefonnumer Anmelden'}
                bgStyle={{backgroundColor: COLORS.white, maxWidth: '100%', borderRadius: 16}}
                titleStyle={{color: COLORS.black, fontFamily: 'RH-Medium'}}
            />

        <Text style={[T4, {marginTop: 30}]}>Über die Speicherung und Verarbeitung personen- bezogener Daten findest du in unsere <Text onPress={() => console.log('press Datenschutz')} style={[T4, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>Datenschutzerklärung</Text> alle wichtige Erläuterungen. {"\n"}Bitte liest Sie sorgfältig durch!</Text>
        </View>
    
    </View>

  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'RH-Regular', 
        fontSize: moderateScale(44,0.2), 
        lineHeight: 44,
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
    },

    bottomContainer: {
        height: 100,
        width: width,
        backgroundColor: COLORS.mainBackground,
        position: 'absolute',
        bottom: 0,
    },

    mainCard: {
        width: width-40,
        height: height-150,
        backgroundColor: COLORS.mainBackground,
        padding: 25,
        margin: 20,
        marginTop: 50,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    }
})