import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
// Redux
import { useDispatch } from 'react-redux'
import { setShowFilterModal } from '../../redux/slices/showModalSlice'
import { setLeaveSearchScreen, setOnSearchScreen, setResetFilter, setResetSortCategory } from '../../redux/slices/searchSlice'
// Constants
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SearchBox from '../../components/components_search_screen/SearchBox'
import FilterModal from '../../components/components_search_screen/FilterModal'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'
import LocateModal from '../../components/components_locate_screen/LocateModal'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function Search({
  navigation,
  navigation: {goBack}
}) {

// Redux
const dispatch = useDispatch()

// ---- start - Exit Screen Handler
  // Handle Exit Button
  const handleLeaveSearch = () => {

    goBack()
  }
  // Listener Exit Screen - Reset all selected
  useEffect(() => {
    const enterScreen = navigation.addListener('focus', () => {
      dispatch(setOnSearchScreen())
      console.log('enter')
    })
    const exitScreen = navigation.addListener('blur', () => {
      dispatch(setResetFilter())
      dispatch(setResetSortCategory())
      dispatch(setLeaveSearchScreen())
      console.log('exit')
    })
    return exitScreen, enterScreen
  }, [navigation])
// ---- end - Exit Screen Handler

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.screen}>

      {/* ---- Modal Section */}
        {/* Locate Modal */}
          <LocateModal onSearchScreen/>
          <ScreenOverlay locate delay={0}/>
        {/* Filter Modal */}
          <FilterModal showCategorySelection/>
          <ScreenOverlay search delay={0}/>
      
      {/* ---- start - Background Touch - Exit Input Field */}
      <Pressable
        style={{
          height: height, 
          width: width, 
          position: 'absolute',
        }} 
        onPress={() => Keyboard.dismiss()} 
      >

        {/* ------------------------------------------------ */}
        {/* Main Component */}
        {/* ------------------------------------------------ */}
        <SearchBox 
          onPressGoBack={handleLeaveSearch}
          onPressShowFilterModal={() => dispatch(setShowFilterModal())}
        />

      </Pressable>
      {/* ---- end - Background Touch - Exit Input Field */}

    </View>
  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },

})