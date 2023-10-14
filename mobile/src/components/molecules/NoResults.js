import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'

export default function NoResults({
    message,
    boxHeight,
}) {
  return (
    <View style={[styles.containerStyle, boxHeight]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    containerStyle: {
        height: 200,
        width: width-60,
        borderRadius: 16,
        marginHorizontal: 30,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },

    message: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: '#a0a0a0',
    }

})