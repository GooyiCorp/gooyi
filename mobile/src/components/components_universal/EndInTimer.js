import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { T2, T3, T4 } from '../../constants/text-style'
import { COLORS } from '../../index/constantsindex'

export default function EndInTimer() {
  return (
    <View style={{ marginLeft: 20}}>
        {/* <Text style={[T3, {color: COLORS.grey, marginBottom: 5}]}>Angebot endet in:</Text> */}
    <View style={styles.container}>
      <Text style={[T2, {color: COLORS.white, fontFamily: 'RH-Medium'}]}>20d 16h 30m</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-start',
        // borderRadius: 6
    }
})