import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import HeaderButton from '../universal/Buttons/HeaderButton'
import Icons, { icons } from '../universal/Icons/Icons'
import { useNavigation } from '@react-navigation/native'


export default function ScannerHeader() {

    const navigation = useNavigation()
    // ------------------------------
    // Header Buttons 
    // ------------------------------
    const ScannerHeader = [
        {title: 'Scanner', route: 'ScannerScreen'},
        {title: 'Code eingabe', route: 'CodeInput'},
        {title: 'Schnellauswahl verwalten', route: 'ManageQuickSelection'}
    ]
    const [selected, setSelected] = useState('Scanner')
    const handlePress = (row) => {
        setSelected(row.title)
        navigation.navigate(row.route)
    }
  return (
    <View style={{position: 'absolute', width: width, height: 110, backgroundColor: COLORS.white, zIndex: 6}}>

        <View 
            style={{
                paddingHorizontal: 20,
                marginTop: 40,
                height: 70,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <ScrollView style={{flexDirection: 'row', overflow: 'visible'}} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {ScannerHeader.map((buttons) => (
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

            </ScrollView>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({})