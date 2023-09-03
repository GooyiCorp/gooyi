import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function Loading( {navigation} ) {
  return (
    <View style={styles.screen}>
      <Text>S-Loading</Text>
      <Button title='next' onPress={ () => {navigation.navigate('Main')} }/>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})