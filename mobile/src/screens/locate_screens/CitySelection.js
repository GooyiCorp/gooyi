import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H1, H3, H4, T1 } from '../../constants/text-style'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPosition, setSelected, setSupplement } from '../../redux/slices/locateSlice'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { setHideLocateModal, setShowFilterModal } from '../../redux/slices/showModalSlice'
import { setFilterModalIndex } from '../../redux/slices/searchSlice'


export default function CitySelection({
  navigation: {goBack},
}) {

  const dispatch = useDispatch()
  const onSearchScreen = useSelector((state) => state.search.onSearchScreen)

  const handleSetPosition = () => {
    dispatch(setSelected('city'))
    dispatch(setCurrentPosition('Bremen'))
    dispatch(setSupplement('Bremen, Deutschland'))
    dispatch(setHideLocateModal())
    if (onSearchScreen) {
      dispatch(setShowFilterModal())
    }
    setTimeout(() => {
      goBack()
    }, 500)
}
  return (
    <View style={styles.screen}>
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Stadt Auswahl'}
            iconStyle={COLORS.mainBackground}
        />

        <View style={styles.headerContainer}>

          <TouchableOpacity
            style={styles.selector}
            onPress={handleSetPosition}
          >
            <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Bremen</Text>
          </TouchableOpacity>
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

    headerContainer: {
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