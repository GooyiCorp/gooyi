import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'

export default function OfferCardDetail() {
  return (
    <View style={styles.card}>
      {/* Header Back Button */}
      <SettingHeader
        goBack
        // onPressGoBack={handleGoBack}
        header
        headerText={'Vorschau'}
        iconStyle={COLORS.mainBackground}
      />   
        <View style={styles.imageBox}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground
    },
    imageBox: {
        height: 0.25*height,
        width: width-40,
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 16,
        marginHorizontal: 20
    }
})