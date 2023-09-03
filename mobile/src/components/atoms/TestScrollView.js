import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TestScrollView() {
  return (
    <View>
      <ScrollView>
        <View style={{height:200}}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        width: 200,
        height:200,
        margin: 10,
        backgroundColor: 'green',
    }
})