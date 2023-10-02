import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons, {icons} from './Icons'

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
        height: 42,
        width: 42,
        backgroundColor: 'grey',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})