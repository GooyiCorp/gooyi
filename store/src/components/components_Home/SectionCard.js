import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T1, T2 } from '../../helper/constants/text'

export default function SectionCard({
    title
}) {
  return (
    <View 
        style={{
            width: width/2-25,
            height: 100,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}
    >
      <Text style={[T1, {fontFamily: 'RH-Bold'}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})