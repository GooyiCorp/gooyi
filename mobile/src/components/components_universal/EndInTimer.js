import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { H2, H3, H4, T2, T3, T4 } from '../../constants/text-style'
import { COLORS } from '../../index/constantsindex'

const Digit = ({value, unit}) => {
  return (
    <View style={{alignItems: 'center'}}>
      
      {/* <Text style={[T4, {color: COLORS.grey}]}>{unit}</Text> */}
    </View>
  )
}

export default function EndInTimer() {
  return (
    <View style={{marginTop: 10}}>
      <Text style={[T4, {marginRight: 10}]}>Angebot endet in:</Text>
      <View style={styles.container}>
        <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>26 : 17 : 08 : 46</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.ivoryDark,
        alignSelf: 'flex-start',
        marginTop: 5
        // borderRadius: 6
    }
})