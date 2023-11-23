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
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { useDispatch } from 'react-redux'
import { setShowFilterModal } from '../../redux/slices/showModalSlice'

export default function Search({navigation: {goBack}}) {
  const dispatch = useDispatch()
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

      <RoundButton 
        icon={icons.FontAwesome}
        iconName={'sliders'}
        iconSize={22}
        iconColor={COLORS.white}
        activeOpacity={1}
        style={{
            backgroundColor: COLORS.grey,
            position: 'absolute',
            right: 30,
            bottom: 30,
            margin: 0
        }}
        onPressButton={() => dispatch(setShowFilterModal())}
      />
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