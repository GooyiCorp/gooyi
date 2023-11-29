import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { T1, T2 } from '../../constants/text-style'

export default function QuestFeed() {
  return (
    <View style={styles.container}>
      <Text style={[T2, styles.taskText]} >Besuche Dat Backhus 5 Tage in Folge.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        width: width-60,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    taskText: {
        alignSelf: 'center',
        color: COLORS.grey,
        fontFamily: 'RH-Medium'
    }
})