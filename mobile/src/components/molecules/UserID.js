import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  {default as QR} from 'react-native-qrcode-svg';

export default function UserID({setUserID}) {
    const idNumber = Math.random().toString()
  return (
    <View>
	{setUserID && <View style={styles.container}>
        
      <View style={{height: 430, width: 363, justifyContent: 'center', alignItems: 'center'}}>

        <Text style={styles.userNameStyle}>Sebastian</Text>
        <View style={styles.qrCodeContainer}>
        <QR
        value={idNumber}
        size={250}
        color="black"
        backgroundColor="white"
        // getRef={getRef}
        />
        </View>
        <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{idNumber}</Text></Text>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, textAlign: 'center', marginTop: 15 }}>{`Lasse teilnehmenden Partnern diesen QR-Code
scannen, um Punkte zu sammeln.`}</Text>
        </View>

    </View>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 363,
        height: 489,
        backgroundColor: '#ffffff'
    },
    
    
      userNameStyle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 28, 
        fontWeight: 'bold',
        marginTop: 10,
      },
      
      qrCodeContainer: {
        height: 252,
        width: 252,
        //backgroundColor: '#eeeeee',
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
        id: {
          fontFamily: 'Roboto-Bold',
          fontSize: 15,
          marginLeft: 15,
      }
})

{/* <View style={styles.contentContainer}>
<View style={{height: 430, width: 363, justifyContent: 'center', alignItems: 'center'}}>

  <Text style={styles.userNameStyle}>Sebastian</Text>
  <View style={styles.qrCodeContainer}>
  <QR
  value={idNumber}
  size={250}
  color="black"
  backgroundColor="white"
  // getRef={getRef}
  />
  </View>
  <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{idNumber}</Text></Text>
  <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, textAlign: 'center', marginTop: 15 }}>{`Lasse teilnehmenden Partnern diesen QR-Code
scannen, um Punkte zu sammeln.`}</Text>
</View>

</View> */}