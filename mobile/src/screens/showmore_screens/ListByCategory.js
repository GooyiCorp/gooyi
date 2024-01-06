import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import Filter from '../../components/components_search_screen/Filter'
import CategoryIconButton from '../../components/components_discover_screen/CategoryButtonSelector/CategoryIconButton'
import { icons } from '../../components/components_universal/Icons'
import CategoryButtonSelector from '../../components/components_discover_screen/CategoryButtonSelector/CategoryButtonSelector'

export default function ListByCategory({
  navigation: {goBack}
}) {
  return (
    <View style={styles.card}>
      <SettingHeader
        goBack
        onPressGoBack={() => goBack()}
        header
        headerText={'Pizza'}
        iconStyle={COLORS.mainBackground}
        selectorButton
      />
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