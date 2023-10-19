import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RoundButton from '../../../components/components_universal/RoundButton'
import { COLORS } from '../../../index/constantsindex'
import { moderateScale } from '../../../helper/scale'
import { icons } from '../../../components/components_universal/Icons'
import AnimatedSuccessIcon from '../../../components/components_universal/AnimatedSuccessIcon'
import { height, width } from '../../../constants/size'
import BigButton from '../../../components/components_LogIn/BigButton'

export default function CheckEmail({navigation, route}) {
    const {returnEmail} = route.params;
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
        onPressButton={() => navigation.navigate('Register1')}
        />

        {/* -------------------------------------------------------------------- Animated Check Icon */}
        <AnimatedSuccessIcon styleContainer={{marginTop: 50}}/>

        {/* -------------------------------------------------------------------- Main Content */}
        <Text style={[styles.title]}>Checke deine {"\n"} E-Mails</Text>

        <Text style={styles.subHeaderStyle}>Wir haben dir an deine E-Mail-Adresse:</Text>

        {/* E-Mail Return */}
        <View style={styles.emailContainer}>
            <Text style={styles.email}>{returnEmail}</Text>
        </View>

        <Text style={[styles.subHeaderStyle, {marginTop: 0}]}>einen Link gesendet. Tippe den Link an, {"\n"}um dich anzumelden.</Text>

        {/* -------------------------------------------------------------------- Send New Link */}
        <BigButton

        // Base
        title={'Link erneut zusenden'}
        bgStyle={{
            backgroundColor: 'transparent',
        }}
        titleStyle={{
            color: COLORS.primary,
            fontFamily: 'Roboto-Medium'
        }}                

        // Call handle
        onPress={console.log('send new Link')}

        />

<Button title='test Button (skip Link)' onPress={() => navigation.navigate('EnterUserInformation')}/>

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
            fontFamily: 'Roboto-Medium',
        }}

        // Call handle
        onPress={console.log('open Mail App')}
        
        />


    </View>
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

    email: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: COLORS.subPrimary,
        alignSelf: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
    },

    emailContainer: {
        backgroundColor: COLORS.subPrimary02,
        borderRadius: 50,
        // borderBottomColor: COLORS.subPrimary, borderBottomWidth: 0.5, 
        alignSelf: 'center', 
        marginVertical: 10,
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
    }

})