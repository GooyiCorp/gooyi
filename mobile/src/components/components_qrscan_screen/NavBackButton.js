import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../index/constantsindex'

export default function NavBackButton({
  customStyle,
  onPressBack
}) {

  return (
    <TouchableOpacity style={styles.opacityRadius} onPress={onPressBack}>
      <View style={[styles.icon, customStyle]}>
        <MaterialIcons name="close" size={23} color="white" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    icon: {
        width: 36,
        height: 36,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    opacityRadius: {
      width: 60,
      height: 60,
      //backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
})