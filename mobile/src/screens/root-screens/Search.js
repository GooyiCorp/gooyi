import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
import SettingHeader from '../../navigation/navigationComponents/SettingHeader'
import { H3 } from '../../constants/text-style'

export default function Search({navigation: {goBack}}) {
  return (
    <View style={styles.screen}>
        <SettingHeader 
            goBack
            onPressGoBack={() => goBack()}
        />
        <View>
            <Text style={[H3, {marginHorizontal: 30, marginBottom: 20}]}>Suche</Text>
        </View>
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