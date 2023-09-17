import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { height, width } from '../../constants/size'
import { Ionicons } from '@expo/vector-icons'
import ProfileScreenHeader from '../../navigation/navigationComponents/ProfileScreenHeader'

export default function AccountSetting({navigation: {goBack}}) {

// ---------------------------------------------------------------------------------------------------------------------  
  return (
    <View style={{flex: 1}}>
        <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

            {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            
            <View style={styles.cardStyle}>
                <ProfileScreenHeader 
                    goBack
                    onPressGoBack={() => goBack()}
                    headerTitle
                    titleText={'Passwort und Sicherheit'}
                />
            </View>

            {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
    cardStyle: {
        height: height/8*7,
        width: width,
        backgroundColor: '#ffffff',
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    }
})
