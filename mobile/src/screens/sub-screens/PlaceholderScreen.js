import { StyleSheet,View, Text } from 'react-native'
import React from 'react'

export function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Entdecke</Text>
    </View>
  )
}
export function CouponScreen() {
  return (
    <View style={styles.screen}>
      <Text>Coupon</Text>
    </View>
  )
}
export function StoreScreen() {
  return (
    <View style={styles.screen}>
      <Text>Store</Text>
    </View>
  )
}
export function MapScreen() {
  return (
    <View style={styles.screen}>
      <Text>Map</Text>
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