import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Onboarding( {navigation} ) {
  return (
    <View style={styles.screen}>
      <Text>S-Onboarding</Text>
      <Button title='next' onPress={ () => {navigation.navigate('Loading')} }/>
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