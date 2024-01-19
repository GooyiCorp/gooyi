import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../constants/colors'

export default function CouponsScreen() {
  return (
    <View style={styles.screen}>
      <Text>CouponsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 30,
    },
})