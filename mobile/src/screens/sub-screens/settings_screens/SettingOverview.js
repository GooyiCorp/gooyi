import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { useNavigation } from '@react-navigation/native'
import RoundButton from '../../../components/components_universal/RoundButton'
import { icons } from '../../../components/components_universal/Icons'
import { moderateScale } from '../../../helper/scale'
import { COLORS } from '../../../index/constantsindex'
import SettingButton from '../../../components/components_profile_screen/SettingButton'
import Switch from '../../../components/components_universal/Switch'

export default function SettingOverview() {
    const navigation = useNavigation()
  return (
    <View style={styles.screen}>

        <SettingHeader 
            goBack
            onPressGoBack={() => navigation.navigate('Main')}
            userID
        />
        
        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>App Einstellungen</Text>
          <Text style={styles.infoText}>Hier kannst du deine Daten sowie Einwilligungen einsehen und aktualisieren!</Text>
        </View>

        {/* -------------------------------------------------------------------- General Setting */}
        <View style={[styles.box, {marginTop: 30}]}>
            {/* Label */}
            <Text style={styles.h2}>ALLGEMEIN</Text>
            {/* Setting */}
            <View>
                {/* Edit Profile */}
                <SettingButton 
                    label={'Profil bearbeiten'} 
                    chevron
                    onPress={() => navigation.navigate('EditProfile')}
                />
                <View style={styles.line}></View>
                {/* Change PIN */}
                <SettingButton 
                    label={'PIN ändern'} 
                    chevron
                    onPress={() => navigation.navigate('ChangePin')}
                />
                <View style={styles.line}></View>
                {/* Face ID */}
                <SettingButton 
                    label={'Face ID aktivieren'} 
                    chevron
                    onPress={() => navigation.navigate('FaceID')}
                />
                <View style={styles.line}></View>
                {/* Face ID */}
                <SettingButton 
                    label={'Zahlungsdaten'} 
                    chevron
                    onPress={() => navigation.navigate('Payment')}
                />
            </View>
        </View>

        {/* -------------------------------------------------------------------- Notification Setting */}
        <View style={styles.box}>
            {/* Label */}
            <Text style={styles.h2}>BENACHRICHTIGUNGEN</Text>
            {/* Setting */}
            <View>
                {/* Edit Profile */}
                <SettingButton 
                    label={'Benachrichtigung aktivieren'} 
                    switchButton
                    switchState={true}
                    disabled={true}
                />
            </View>
        </View>

        {/* -------------------------------------------------------------------- Terms and Support */}
        <View style={styles.box}>
            {/* Label */}
            <Text style={styles.h2}>RECHTLICHES & SUPPORT</Text>
            {/* Setting */}
            <View>
                {/* Edit Profile */}
                <SettingButton 
                    label={'Rechtliches & Einwilligungen'} 
                    chevron
                    onPress={() => navigation.navigate('Terms')}
                />
                <View style={styles.line}></View>
                {/* Change Password */}
                <SettingButton 
                    label={'Über Gooyi'} 
                    chevron
                    onPress={() => navigation.navigate('About')}
                />
                <View style={styles.line}></View>
                {/* Face ID */}
                <SettingButton 
                    label={'Hilfe & Support'} 
                    chevron
                    onPress={() => navigation.navigate('Support')}
                />
            </View>
        </View>

        {/* -------------------------------------------------------------------- Notification Setting */}
        <View style={[styles.box, {marginTop: 10}]}>
            {/* Setting */}
            <View>
                {/* Edit Profile */}
                <SettingButton 
                    label={'Abmelden'} 
                    logout
                    style={{
                        maxWidth: '30%',
                    }}
                    labelStyle={{
                        color: COLORS.primary,
                        fontFamily: 'RH-Bold'
                    }}
                />
            </View>
        </View>


    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    headerContainer: {
        width: width-60,
        marginHorizontal: 30,
        //marginTop: 120,
      },
    
      title: {
        fontFamily: 'RH-Black', 
        fontSize: moderateScale(30,0.2), 
        color: COLORS.primary,
        lineHeight: 44,
        marginTop: 15,
        // textAlign: 'center'
      },
    
      infoText: {
        marginTop: 10,
        fontFamily: 'RH-Medium',
        color: COLORS.black,
        fontSize: 15,
      },

      h2: {
        fontFamily: 'RH-Bold',
        fontSize: 20,
        color: COLORS.grey,
      },

      box: {
        width: width,
        paddingHorizontal: 30,
        marginTop: 25,
      },

      line: {
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
      }
})