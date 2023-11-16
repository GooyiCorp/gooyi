import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { width } from '../../constants/size'
import RoundButton from '../components_universal/RoundButton'
import { icons } from '../components_universal/Icons'
import { moderateScale } from '../../helper/scale'

export default function SearchBox() {
  return (
    <View style={styles.container}>
        <RoundButton 
             icon={icons.Ionicons}
             iconName={'md-chevron-back'}
             iconSize={moderateScale(28,0.2)}
             iconColor={COLORS.white}
             style={{
                 backgroundColor: COLORS.grey,
                 height: moderateScale(38,0.2),
                 width: moderateScale(38,0.2),
                 margin: 0,
                 marginRight: 10
             }}
        />
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Wonach möchtest du suchen?'
                style={{flex: 1}}
                returnKeyType='search'
                autoComplete='off'
                autoCorrect='off'
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 50,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        position: 'absolute',
        top: 55,
        // opacity: 0.5
    },

    inputContainer: {
        width: width-60-48,
        height: 50,
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 50,
        justifyContent: 'center',
        paddingLeft: 20,
    }
})