import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { useDispatch } from 'react-redux'
import { setCurrentPosition, setSelected, setSupplement } from '../../../redux/slices/locateSlice'
import { H1, H3, H4, T1 } from '../../../constants/text-style'

export default function CitySelection({navigation: {goBack}}) {

  const dispatch = useDispatch()

  const handleSetPosition = () => {
    dispatch(setSelected('city'))
    dispatch(setCurrentPosition('Bremen'))
    dispatch(setSupplement('Bremen, Deutschland'))
    goBack()
}
  return (
    <View style={styles.screen}>
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Stadt Auswahl'}
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