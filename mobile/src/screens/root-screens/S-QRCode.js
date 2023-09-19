import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import  {default as QR} from 'react-native-qrcode-svg';



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
            size={250}
            color="black"
            backgroundColor="white"
          />
        </View>
        
        {/* User ID */}
        <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{userID}</Text></Text>
    
      </View>

      {/* Direction Container -------------------------------------------- */}
      <View style={styles.directionContainer}>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, textAlign: 'center'}}>{`Lasse teilnehmenden Partnern diesen QR-Code
scannen, um Punkte zu sammeln.`}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  
  userNameContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    // backgroundColor: 'green',
  },

  mainContainer: {
    height: 290,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  
  directionContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  contentContainer: {
    height: 488,
    width: 363,
    backgroundColor: '#ffffff',
  },

  userNameStyle: {
    fontFamily: 'Roboto-Medium', 
    fontSize: 28, 
    fontWeight: 'bold',
  },
  
  qrCodeContainer: {
    height: 252,
    width: 252,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#eeeeee',
  },

  id: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 15,
  }
})
