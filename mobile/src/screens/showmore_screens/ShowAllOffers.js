import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { useDispatch } from 'react-redux'
import { setShowFilterModal, setShowSettingShowMoreModal } from '../../redux/slices/showModalSlice'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'
import ShowMoreOfferModal from '../../components/components-showMore-screen/ShowMoreOfferModal'
import LocateModal from '../../components/components_locate_screen/LocateModal'
import FilterModal from '../../components/components_search_screen/FilterModal'
import { setLeaveSearchScreen } from '../../redux/slices/searchSlice'

export default function ShowAllOffers({
  navigation: {goBack}
}) {

  const dispatch = useDispatch()
  const handleShowSettingModal = () => {
    dispatch(setShowFilterModal())
    // dispatch(setShowSettingShowMoreModal())
  }
  // handle Go Back Button
  const handleGoBack = () => {
    goBack()
    dispatch(setLeaveSearchScreen())
  }
  return (
    <View style={styles.card}>
      <LocateModal onSearchScreen/>
      <ScreenOverlay locate delay={0}/>
      <FilterModal />
      <ScreenOverlay search delay={0}/>
      {/* <ShowMoreOfferModal />
      <ScreenOverlay settingShowMore delay={0}/> */}
      {/* Header Back Button */}
      <SettingHeader
        goBack
        onPressGoBack={handleGoBack}
        header
        headerText={'Neue Angebote'}
        iconStyle={COLORS.mainBackground}
        setting
        onPressSettingShowMore={handleShowSettingModal}
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