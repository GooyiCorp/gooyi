import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'

export default function UserCard() {
  return (
    <View style={[styles.card]}>
        <Text>250P</Text>
      <Text>Thien Thanh</Text>
      <Text>NutzerID 12932u423423</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: width-60,
        height: 100,
        backgroundColor: COLORS.white05,
        borderRadius: 16,
        padding: 25,
        marginTop: 20
        // borderWidth: 1,
        // borderColor: COLORS.subPrimary
    },

    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
    }
})