import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { H4, T1, T2 } from '../../helper/constants/text'
import { COLORS } from '../../helper/constants/colors'
import CustomerClassBadge from '../universal/Badge/CustomerClassBadge'
import HeaderButton from '../universal/Buttons/HeaderButton'
import { width } from '../../helper/constants/size'
import { useNavigation } from '@react-navigation/native'

export default function ScoringHeader() {
    const navigation = useNavigation()
    const [selected, setSelected] = useState('Punkteeingabe')
    const ScoringHeader = [
        {title: 'Punkteeingabe', route: 'PointsEntry'},
        {title: 'Schnellauswahl', route: 'QuickSelection'},
    ]
    const handlePress = (row) => {
        setSelected(row.title)
        navigation.navigate(row.route)
    }
  return (
    <View style={{
        position: 'absolute',
        zIndex: 6,
        backgroundColor: COLORS.white,
        height: 200,
    }}>
    <View
        style={{
            paddingTop: 60,
            paddingHorizontal: 20,
            flexDirection: 'row', 
            justifyContent: 'space-between',
        }}
    >
        <View style={{paddingHorizontal: 5, marginTop: 5}}>
            <Text style={[T1, {fontFamily: 'RH-Bold'}]}>Nathalie Akami</Text>
            <Text style={[T2]}>NK29HA23JK</Text>
        </View>

        <View style={{alignItems: 'flex-end'}}>
            <View>
                <CustomerClassBadge type={'Stammkunde'}/>
            </View>
            <View style={{paddingHorizontal: 5}}>
                <Text style={[H4, {fontFamily: 'RH-Bold', marginTop: 8}]}>1020<Text style={{fontFamily: 'RH-Regular', color: COLORS.grey}}> Punkte</Text></Text>
            </View>
        </View>

    </View>

    <View style={{flexDirection: 'row', width: width, justifyContent: 'center', marginTop: 20}}>
        {ScoringHeader.map((buttons) => (
            <HeaderButton 
                key={buttons.title} 
                title={buttons.title} 
                onPress={() => handlePress(buttons)}
                styleContainer={{
                    borderBottomWidth: selected == buttons.title ? 0.5 : 0
                }}
                styleTitle={{
                    fontFamily: selected == buttons.title ? 'RH-Bold' : 'RH-Regular',
                    color: selected == buttons.title ? COLORS.grey : COLORS.lightGrey
                }}
            />
        ))}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({})