import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import PointCounter from '../../components/components_universal/PointCounter'

export default function Loading( {navigation} ) {
  return (
    <View style={styles.screen}>
      <PointCounter />
      {/* <Text>S-Loading</Text>
      <Button title='next' onPress={ () => {navigation.navigate('Main')} }/> */}
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