import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
import SettingHeader from '../../navigation/navigationComponents/SettingHeader'
import { H3 } from '../../constants/text-style'
import SearchBox from '../../components/components_search_screen/SearchBox'

export default function Search({navigation: {goBack}}) {
  return (
    <View style={styles.screen}>
        <SettingHeader 
            goBack
            onPressGoBack={() => goBack()}
        />
            <SearchBox />
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