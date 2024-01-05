import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import Filter from '../../components/components_search_screen/Filter'

export default function ListByCategory({
  navigation: {goBack}
}) {
  return (
    <View style={styles.card}>
      {/* <SettingHeader
        goBack
        onPressGoBack={() => goBack()}
        header
        headerText={'Pizza'}
        iconStyle={COLORS.mainBackground}
        categorySelector
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
  }
})