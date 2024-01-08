import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H3, T2 } from '../../constants/text-style'
// Helpers
import { moderateScale } from '../../helper/scale'
// Components
import RoundButton from './RoundButton'
import Icons, { icons } from './Icons'
import FilterIconSelector from '../components_profile_screen/FilterIconSelector/FilterIconSelector'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PresentationHeader({
    style,
    title,
    showAllButton,
    onPress,
    setting,
    filter,
}) {

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
// Container
<View style={[styles.headerBar, style]}>
    {/* ---- Title */}
    <Text style={H3}>{title}</Text>
    {/* ---- Show More Button */}
    {showAllButton && 
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Mehr anzeigen</Text>
        </TouchableOpacity>
    }
    {/* ---- Open Modal Button */}
    {setting && 
        <RoundButton
            icon={icons.FontAwesome}
            iconName={'sliders'}
            iconSize={26}
            iconColor={COLORS.grey}
            style={{
                backgroundColor: 'transparent',
                height: moderateScale(30,0.2),
                width: moderateScale(38,0.2),
                margin: 0,
                borderRadius: 0,
                zIndex: 1
            }}
            // onPressButton={onPressSettingShowMore}
        />
    }
    {/* ---- Filter Selector */}
    {filter && 
        <FilterIconSelector />
    }

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    containerStyle: {
        width: width,
    },

    headerBar: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', 
        marginHorizontal: 30,
        marginBottom: 15,
    },

    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    buttonTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        color: COLORS.subPrimary
    },

})