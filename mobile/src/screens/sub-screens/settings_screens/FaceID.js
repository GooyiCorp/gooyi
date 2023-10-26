import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'

export default function FaceID() {
  return (
    <View style={styles.screen}>
      <Text>FaceID</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
        justifyContent: 'center',
        alignItems: 'center',
    }
})