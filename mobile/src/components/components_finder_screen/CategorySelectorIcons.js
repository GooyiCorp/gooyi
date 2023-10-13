import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons, {icons} from '../components_universal/Icons'

export default function CatergorySelectorIcons({
    type,
    ico,
    size,
    bgColor,
}) {
  return (
    <View style={[styles.box,{backgroundColor: bgColor}]}>
      <Icons icon={type} iconName={ico} iconColor='#ffffff' iconSize={size}/>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        height: 44,
        width: 44,
        backgroundColor: 'grey',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})