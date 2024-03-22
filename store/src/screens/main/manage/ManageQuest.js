import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'

export default function ManageQuest({navigation: {goBack}}) {
  return (
    <View>
      <SubscreensHeader title={'Quest Übersicht'} onPress={() => goBack()}/>
    </View>
  )
}

const styles = StyleSheet.create({})