import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'

export default function AwardOverview({
  navigation: {goBack}
}) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Prämienübersicht'}
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