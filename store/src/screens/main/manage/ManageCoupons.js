import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'

export default function ManageCoupons({navigation: {goBack}}) {
  return (
    <View>
      <SubscreensHeader title={'Coupon Übersicht'} onPress={() => goBack()}/>
    </View>
  )
}

const styles = StyleSheet.create({})