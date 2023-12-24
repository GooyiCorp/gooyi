import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { useDispatch } from 'react-redux'
import { setShowSettingShowMoreModal } from '../../redux/slices/showModalSlice'
import SettingShowMoreModal from '../../components/components-showMore-screen/SettingShowMoreModal'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'

export default function ShowAllOffers({
  navigation: {goBack}
}) {

  const dispatch = useDispatch()
  const handleShowSettingModal = () => {
    dispatch(setShowSettingShowMoreModal())
  }
  // handle Go Back Button
  const handleGoBack = () => {
    goBack()
  }
  return (
    <View style={styles.card}>
      <SettingShowMoreModal />
      <ScreenOverlay settingShowMore delay={0}/>
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