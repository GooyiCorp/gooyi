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
import IconLabelButton from '../../../components/components_universal/IconLabelButton'
import { H3, T1, T2 } from '../../../constants/text-style'
import Request from '../../../helper/request.js'
import {useSelector, useDispatch} from 'react-redux'
import { setLoggedOut, setRefreshToken, setToken } from '../../../redux/slices/userSlice.js'
import { Delete } from '../../../helper/store.js'
import { store } from '../../../redux/store.js'

export default function SettingOverview() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.user.accessToken)
    const refreshToken = useSelector(state => state.user.refreshToken)
    const handleLogOut = async () => {
        const response = await Request("user/logout", "POST", {refreshToken}, accessToken)
        console.log(response);
        if (response.success) {
            dispatch(setLoggedOut())
            dispatch(setToken(''))
            dispatch(setRefreshToken(''))
            await Delete('accessToken')
            await Delete('refreshToken')
            // Duc anh: Navigate sang trang khac sau khi log out
        }
        // console.log(store.getState().user.accessToken)
    }
  
  return (
    <View style={styles.screen}>

        <SettingHeader 
            goBack
            onPressGoBack={() => navigation.navigate('Main')}
        />
        
        {/* -------------------------------------------------------------------- Header, SubHeader */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>App Einstellungen</Text>
          <Text style={[T1, {marginTop: 10}]}>Hier kannst du deine bei uns hinterlegte Daten einsehen und aktualisieren!</Text>
        </View>

        {/* -------------------------------------------------------------------- General Setting */}
        <View style={[styles.box, {marginTop: 25}]}>
            {/* Label */}
            <Text style={[H3]}>Allgemein</Text>
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
                    lock
                    onPress={() => navigation.navigate('ChangePin')}
                />
                <View style={styles.line}></View>
                {/* Face ID */}
                <SettingButton 
                    label={'Face ID aktivieren'} 
                    lock
                    onPress={() => navigation.navigate('FaceID')}
                />
                <View style={styles.line}></View>
                {/* Face ID */}
                <SettingButton 
                    label={'Zahlungsdaten'} 
                    lock
                    onPress={() => navigation.navigate('Payment')}
                />
            </View>
        </View>

        {/* -------------------------------------------------------------------- Notification Setting */}
        <View style={styles.box}>
            {/* Label */}
            <Text style={[H3]}>Benachrichtigungen</Text>
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
            <Text style={[H3]}>Rechtliches und Support</Text>
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

        {/* -------------------------------------------------------------------- User ID */}
        <View style={styles.bottomContainer}>
            <IconLabelButton
                icon={icons.MaterialIcons}
                iconName={'logout'}
                iconSize={22}
                iconColor={COLORS.mainBackground}
                label={'Abmelden'}
                style={{
                    backgroundColor: COLORS.grey
                }}
                labelStyle={{
                    color: COLORS.mainBackground,
                }}
                onPressButton={handleLogOut}
            />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    bottomContainer: {
        width: width,
        height: 100,
        backgroundColor: COLORS.mainBackground,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 30,
        paddingVertical: 20,
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

      h3: {
        fontFamily: 'RH-Light',
        fontSize: 24,
      },

      box: {
        width: width,
        paddingHorizontal: 30,
        marginTop: 20,
      },

      line: {
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
      },

    title: {
        fontFamily: 'RH-Medium', 
        fontSize: 30,
    },
})