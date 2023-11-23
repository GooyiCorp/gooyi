import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'

export default function CitySelection({navigation: {goBack}}) {
  return (
    <View style={styles.screen}>
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
        />
      <Text>CitySelection</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },
})