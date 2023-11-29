import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React from 'react'
import { ROUTES } from '../../index/constantsindex'


export default function LoadingScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        
      <Text>LoadingScreen</Text>
      <Button title='Press' onPress={()=>{navigation.navigate(ROUTES.RootDiscover)}}/>
    </View>
  )
}

const styles = StyleSheet.create({})