import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'

export default function ManageDeals({navigation: {goBack}}) {
  return (
    <View>
        <SubscreensHeader title={'Deals Übersicht'} onPress={() => goBack()}/>
    </View>
  )
}

const styles = StyleSheet.create({})