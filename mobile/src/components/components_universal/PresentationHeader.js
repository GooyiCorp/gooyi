import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H3, T2 } from '../../constants/text-style'
import RoundButton from './RoundButton'
import Icons, { icons } from './Icons'
import { moderateScale } from '../../helper/scale'
import FilterIconSelector from '../components_profile_screen/FilterIconSelector/FilterIconSelector'

export default function PresentationHeader({
    style,
    title,
    showAllButton,
    onPress,
    setting,
    filter,
}) {
  return (
        <View style={[styles.headerBar, style]}>
            <Text style={H3}>{title}</Text>
            {showAllButton && <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
                <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Mehr anzeigen</Text>
            </TouchableOpacity>}
            {setting && <RoundButton
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
            />}

            {filter && 
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.ivory, height: 50, alignItems: 'center', paddingHorizontal: 10, borderRadius: 16}}>
                <Icons 
                    icon={icons.FontAwesome}
                    iconName={'sort'}
                    iconSize={20}
                    iconColor={COLORS.ivoryDark2}
                    iconStyle={{
                        marginRight: 3
                    }}
                />
                <FilterIconSelector />
            </View>
            }
        </View>
  )
}

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
    }
})