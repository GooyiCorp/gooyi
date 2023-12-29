import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H1, H3, H4, T1 } from '../../constants/text-style'
// React Navigation
import { useNavigationState } from '@react-navigation/native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPosition, setSelected, setSupplement } from '../../redux/slices/locateSlice'
import { setHideLocateModal, setShowFilterModal } from '../../redux/slices/showModalSlice'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CitySelection({
  navigation: {goBack},
}) {

// Redux
const dispatch = useDispatch()

  // Get Route Name
  const routes = useNavigationState(state => state.routes)
  const prevRoute = routes[routes.length - 2];
  // console.log(prevRoute)

  // Handle Set Position
  const handleSetPosition = () => {
    dispatch(setSelected('city'))
    dispatch(setCurrentPosition('Bremen'))
    dispatch(setSupplement('Bremen, Deutschland'))
    // start - Thanh: set latitude / longtitude ----------------------------------------------



    // end - Thanh: set latitude / longtitude ------------------------------------------------
    goBack()
    // Check Previous Screen
    setTimeout(() => {
      dispatch(setHideLocateModal())
      if (prevRoute.name == 'Search' || prevRoute.name == 'ShowAllOffers') {
        dispatch(setShowFilterModal())
      }
    }, 100)
  }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
  <View style={styles.screen}>
    {/* Header */}
    <SettingHeader
      goBack
      onPressGoBack={() => goBack()}
      header
      headerText={'Stadt Auswahl'}
      iconStyle={COLORS.mainBackground}
    />
    {/* Main Container */}
    <View style={styles.mainContainer}>
      {/* ---- start - City Button Section */}
        {/* Bremen */}
        <TouchableOpacity
          style={styles.selector}
          onPress={handleSetPosition}
        >
          <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Bremen</Text>
        </TouchableOpacity>

      {/* ---- end - City Button Section */}
    </View>

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

    mainContainer: {
      width: width-60,
      marginHorizontal: 30,
      //marginTop: 120,
    },
  
    selector: {
      height: 50,
      width: '100%',
      backgroundColor: COLORS.ivoryDark,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center'
    }
})