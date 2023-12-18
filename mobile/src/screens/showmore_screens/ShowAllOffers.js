import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'

export default function ShowAllOffers({
  navigation: {goBack}
}) {

  // handle Go Back Button
  const handleGoBack = () => {
    goBack()
  }
  return (
    <View style={styles.card}>
      {/* Header Back Button */}
      <SettingHeader
        goBack
        onPressGoBack={handleGoBack}
        header
        headerText={'Neue Angebote'}
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