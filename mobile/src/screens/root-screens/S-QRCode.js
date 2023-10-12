import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import  {default as QR} from 'react-native-qrcode-svg';
import { moderateScale } from '../../helper/scale';



// ---------------------------------------------------------------------------------------------------------------------   
export default function QRCode() {

  const userID = Math.random().toString()

// ---------------------------------------------------------------------------------------------------------------------    
  return (
    <View style={styles.contentContainer}>

      {/* User Name Container ------------------------------------------- */}
      <View style={styles.userNameContainer}>
        <Text style={styles.userNameStyle}>Sebastian</Text>
      </View>

      {/* Main Container ------------------------------------------------ */}
      <View style={styles.mainContainer}>
        
        {/* QR Code */}
        <View style={styles.qrCodeContainer}>          
          <QR
            value={userID}
            size={moderateScale(250,1)}
            color="black"
            backgroundColor="white"
          />
        </View>
        
        {/* User ID */}
        <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{userID}</Text></Text>
    
      </View>

      {/* Direction Container -------------------------------------------- */}
      <View style={styles.directionContainer}>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: moderateScale(12,1), textAlign: 'center'}}>{`Lasse teilnehmenden Partnern diesen QR-Code
scannen, um Punkte zu sammeln.`}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  
  userNameContainer: {
    height: moderateScale(80,1),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: moderateScale(10,1),
    // backgroundColor: 'green',
  },

  mainContainer: {
    height: moderateScale(290,1),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  
  directionContainer: {
    height: moderateScale(60,1),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  contentContainer: {
    height: moderateScale(488,1),
    width: moderateScale(363,1),
    backgroundColor: 'yellow',
  },

  userNameStyle: {
    fontFamily: 'Roboto-Medium', 
    fontSize: moderateScale(28,1), 
    fontWeight: 'bold',
  },
  
  qrCodeContainer: {
    height: moderateScale(252,1),
    width: moderateScale(252,1),
    marginBottom: moderateScale(15,1),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#eeeeee',
  },

  id: {
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(15,1),
  }
})
