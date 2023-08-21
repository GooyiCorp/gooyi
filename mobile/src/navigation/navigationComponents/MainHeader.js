import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

import { Avatar } from 'react-native-paper'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'


// Main Declaration -----------------------------------------------------------------------------------------------------------------------------------------
export default function MainHeader({
    title, 
    headerContainerStyle,
    titleStyle, 
    avatar, 
    onPressAvatar, 
    rightComponent,
    qrButton,
    onPressQRButton,
    notificationButton,
    onPressNotificationButton,
}) {

    // Right View ------------------------------------------------------------------------------------------
    const RightView = () => (
        rightComponent ? rightComponent : 
        <View style={[styles.view, styles.rightView]}>

            {/* QR Button */}
            {qrButton && <TouchableOpacity style={styles.qrScanButton} onPress={onPressQRButton}>
                  <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
              </TouchableOpacity>}

            {/* Avatar Button  */}
            {avatar && <TouchableOpacity onPress={onPressAvatar}>
                <Avatar.Text size={42} label="XD" style={{margin: 5}}/>
            </TouchableOpacity>}

            {/* Notification Button  */}
            {notificationButton && <TouchableOpacity style={[styles.qrScanButton, {backgroundColor: '#F4F4F4'}]} onPress={onPressNotificationButton}>
                    <MaterialIcons name="notifications-none" size={26} color="black" />
              </TouchableOpacity>}

        </View>
    )

    // Title View ------------------------------------------------------------------------------------------
    const TitleView = () => (
        <View>
            <Text style={[styles.titleDefaultStyle, titleStyle]}>{title}</Text>
        </View>
    )
  
    // Return View -----------------------------------------------------------------------------------------
    return (
        <View style={[styles.headerDefaultContainer, headerContainerStyle]}>
            <View style={styles.headerJustifyView}>
                <TitleView />
                <RightView />
            </View>
        </View>
  )
}

// Styles ---------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    
    headerDefaultContainer: {
        height: 110,
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'flex-end',
    },

    headerJustifyView: {
        height: 60,
        paddingLeft: 30,
        paddingRight: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'yellow',
    },

    titleDefaultStyle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 28, 
        fontWeight: 'bold',
        marginTop: 10,
    },

    view: {
        flexDirection: 'row',
    },

    rightView: {
        justifyContent: 'flex-end',
    },

    qrScanButton: {
        height: 42,
        width: 42,
        backgroundColor: 'red',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
})