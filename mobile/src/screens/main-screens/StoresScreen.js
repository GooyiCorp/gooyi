import React from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'
import { ROUTES } from '../../constants';


export default function StoresScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Stores</Text>
      <Button title='move' onPress={() => navigation.navigate(ROUTES.STOREDETAILS)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})