import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'

export default function ResetPasswordScreen() {
  return (
    <View style={styles.screen}>
      <Text>ResetPasswordScreen</Text>
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