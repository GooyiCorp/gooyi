import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'

export default function ManageQuickSelection() {
  return (
    <View style={{
        height: height,
        width: width,
        backgroundColor: COLORS.white
    }}>
      <Text>ManageQuickSelection</Text>
    </View>
  )
}

const styles = StyleSheet.create({})