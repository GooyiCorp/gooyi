import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'

export default function CouponsOverview({
  navigation: {goBack}
}) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Meine Coupons'}
            iconStyle={COLORS.mainBackground}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
  },
})