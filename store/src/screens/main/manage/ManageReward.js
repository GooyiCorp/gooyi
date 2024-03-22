import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'

export default function ManageReward({navigation: {goBack}}) {
  return (
    <View>
      <SubscreensHeader title={'Prämien Übersicht'} onPress={() => goBack()}/>
    </View>
  )
}

const styles = StyleSheet.create({})