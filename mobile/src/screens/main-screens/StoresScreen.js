import React from 'react'
import { StyleSheet,View, Text, Button } from 'react-native'
import { ROUTES } from '../../constants';
import { Store2 } from '../sub-screens/PlaceholderScreen';


export default function StoresScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text>Stores</Text>
      <Button title='move' onPress={() => navigation.navigate(Store2)}/>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    }
})