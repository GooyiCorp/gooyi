import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { COLORS } from '../../../index/constantsindex'
import { moderateScale } from '../../../helper/scale'
import Icons, { icons } from '../../../components/components_universal/Icons'
import AnimatedSuccessIcon from '../../../components/components_universal/AnimatedSuccessIcon'
import { height, width } from '../../../constants/size'
import BigButton from '../../../components/components_LogIn/BigButton'
import { openInbox } from "react-native-email-link";
import SendNewLinkButton from '../../../components/components_LogIn/SendNewLinkButton'
import { api_url } from '../../../constants/api'
import axios from 'axios'
import { H1, T1 } from '../../../constants/text-style'

export default function CheckEmail({navigation, route}) {

    const {returnEmail} = route.params;
    console.log(returnEmail)

    const handleSendNewLink = async () => {
        const url = api_url + 'user/email-login/'
            try {
                const response = await axios.post(url, {
                "email": returnEmail.toLowerCase()
                })
        
                // success
                console.log(response.data);
            
            } 
                // error
            catch (error) {
                console.log(error.response.data);
            }
         }

  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.primary}}>

        {/* -------------------------------------------------------------------- Go Back Button */}
        <RoundButton
        icon={icons.Ionicons}
        iconName={'md-chevron-back'}
        iconSize={moderateScale(28,0.2)}
        iconColor={COLORS.primary}
        style={{
            backgroundColor: COLORS.white05,
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            marginLeft: 30,
            marginTop: 60
        }}
        onPressButton={() => navigation.navigate('Register1')}
        />

        {/* -------------------------------------------------------------------- Animated Check Icon */}
        <AnimatedSuccessIcon styleContainer={{marginTop: 50}}/>

        {/* -------------------------------------------------------------------- Main Content */}
        <Text style={[H1, {fontFamily: 'RH-Black', color: COLORS.white, marginVertical: 20, textAlign: 'center'}]}>Checke deine E-Mails</Text>

        <Text style={[T1, {fontFamily: 'RH-Medium', textAlign: 'center', color: COLORS.white}]}>Wir haben an deine E-Mail-Adresse</Text>

        {/* E-Mail Return */}
        <View style={styles.emailContainer}>
            <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.white}]}>{returnEmail}</Text>
        </View>

        <Text style={[T1, {fontFamily: 'RH-Medium', textAlign: 'center', color: COLORS.white, marginTop: 0}]}>einen Link gesendet. Tippe auf diesen  {"\n"}Link, um dich anzumelden.</Text>

        {/* -------------------------------------------------------------------- Send New Link */}
        <SendNewLinkButton 
            handleOnPress={handleSendNewLink}
            counterValue={20}
            style={{
                marginTop: 30
            }}
        />


        {/* -------------------------------------------------------------------- Open Mail App */}
        <BigButton

        // Base
        title={'Zu E-Mail Programm wechseln'}
        bgStyle={{
            backgroundColor: COLORS.primary,
            position: 'absolute',
            bottom: 30
        }}                
        titleStyle={{
            color: COLORS.white, 
            fontFamily: 'RH-Bold',
        }}

        // Call handle
        onPress={openInbox}
        
        />

    </View>
  )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: 'RH-Black', 
        fontSize: moderateScale(30,0.2), 
        color: COLORS.white,
        marginHorizontal: 30,
        alignSelf: 'center',
        marginTop: 50,
        textAlign: 'center'
    },
    
    subHeaderStyle: {
        marginTop: 20,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        marginHorizontal: 30,
        alignSelf: 'center',
        textAlign: 'center'
    },
    
    infoText: {
        marginTop: 10,
        fontFamily: 'RH-Medium',
        fontSize: 15,
        marginHorizontal: 30,
        color: COLORS.white05,
        textAlign: 'center'
      },

    email: {
        fontFamily: 'RH-Bold',
        fontSize: 15,
        color: COLORS.white,
        alignSelf: 'center',
        marginVertical: 6,
    },

    emailContainer: {
        backgroundColor: 'transparent',
        //borderBottomWidth: 0.5,
        //borderColor: COLORS.white05,
        // borderBottomColor: COLORS.subPrimary, borderBottomWidth: 0.5, 
        alignSelf: 'center', 
        paddingHorizontal: 20,
        marginVertical: 10
    },

    sendNewLink: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 100,
        
    },

    sendNewLinkLabel: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: COLORS.primary,
    },

})