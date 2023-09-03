import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Category from '../atoms/Category'

export default function CategorySelection() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Category title={'Sushi'} number={14}/>
    </View>
  )
}

const styles = StyleSheet.create({})