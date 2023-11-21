import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RoundButton from '../components_universal/RoundButton'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import { T2, T4 } from '../../constants/text-style'
import { useSelector } from 'react-redux'

export default function LocateButton({
    onPress
}) {

    const currentPosition = useSelector((state) => state.locate.currentPosition)
    const selected = useSelector((state) => state.locate.selected)

  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={[styles.iconContainer, {borderRadius: selected? 50 : 10}]}>
            {selected == undefined && <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'navigation-variant-outline'}
                iconSize={23}
                iconColor={COLORS.grey}
            />}

            {selected == 'navigate' && <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'navigation-variant'}
                iconSize={23}
                iconColor={COLORS.grey}
            />}

            {selected == 'city' && <Icons
                icon={icons.MaterialIcons}
                iconName={'location-city'}
                iconSize={21}
                iconColor={COLORS.grey}
            />}

            {selected == 'add' && <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'map-marker'}
                iconSize={22}
                iconColor={COLORS.grey}
            />}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={[T2, {fontFamily: 'RH-Medium',color: COLORS.grey, marginLeft: 10, marginRight: 3}]}>{currentPosition? currentPosition : 'Standort auswählen'}</Text>
            <Icons 
                icon={icons.Ionicons}
                iconName={'md-caret-down-sharp'}
                iconSize={16}
                iconColor={COLORS.lightGrey}
            />
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    iconContainer: {
        height: 38,
        width: 38,
        backgroundColor: COLORS.ivoryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})