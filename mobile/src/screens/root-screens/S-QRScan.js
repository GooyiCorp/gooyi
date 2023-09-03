import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

export default function QRScan({navigation: {goBack}}) {
  return (
    <View style={{flex: 1}}>
        <BlurView intensity={16}  style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:363, height:500, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 16}}>
            <Text>QRScanScreen</Text>
            <Button title='back' onPress={() => goBack()}/>
        </View>
        </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({})