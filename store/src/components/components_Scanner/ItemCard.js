import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'

export default function ItemCard() {
  return (
    <View 
        style={{
            width: width/2-25,
            height: 100,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            marginBottom: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
        }}
    >
      <Text>ItemCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({})