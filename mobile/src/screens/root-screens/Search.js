import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
import SettingHeader from '../../navigation/navigationComponents/SettingHeader'
import { H3 } from '../../constants/text-style'
import SearchBox from '../../components/components_search_screen/SearchBox'
import SearchFeed from '../../components/components_search_screen/SearchFeed'
import FilterModal from '../../components/components_search_screen/FilterModal'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'

export default function Search({navigation: {goBack}}) {
  return (
    <View style={styles.screen}>
      <FilterModal />
      <ScreenOverlay search/>
      <Pressable
        style={{
          height: height, 
          width: width, 
          position: 'absolute',
        }} 
        onPress={() => Keyboard.dismiss()} 
      >
      <SearchBox onPressGoBack={() => goBack()}/>
      </Pressable>
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