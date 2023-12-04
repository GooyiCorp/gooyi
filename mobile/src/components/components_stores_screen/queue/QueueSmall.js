import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { height } from '../../../constants/size'
import { H1 } from '../../../constants/text-style'
import { useNavigation } from '@react-navigation/native'

export default function QueueSmall() {
    const navigation = useNavigation()
  return (
    <Pressable style={[styles.container, styles.shadow]} onPress={() => navigation.navigate('Store', {screen: 'QueueOverview'})}>
      <Text style={[H1]}>15</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.white,
        borderRadius:30,
        position: 'absolute',
        right: 30,
        zIndex: 4,
        top: 0.3*height,
        justifyContent: 'center',
        alignItems: 'center'
    },

    shadow: {
        shadowColor:"#686868",
        shadowOffset: {
           width: 0,
           height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 0
    }
})