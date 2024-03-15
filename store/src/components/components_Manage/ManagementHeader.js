import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../helper/constants/colors'
import { width } from '../../helper/constants/size'
import { H5 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'
import HeaderButton from '../universal/Buttons/HeaderButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedScreen } from '../../redux/slices/manageScreenSlice'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ManagementHeader({}) {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    // ------------------------------
    // Header Buttons 
    // ------------------------------
    const ManageHeader = [
        {title: 'Geschäft', route: 'ManageStore'},
        {title: 'Personal', route: 'ManageTeam'}
    ]
    const selected = useSelector(state => state.manageScreen.selectedScreen)
    const handlePress = (row) => {
        dispatch(setSelectedScreen(row.title))
        navigation.navigate(row.route)
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

            {/* ---- start - Left Section */}
            <View 
                style={{
                    flexDirection: 'row'
                }}
            >
                {ManageHeader.map((buttons) => (
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
            {/* ---- end - Left Section */}

            {/* ---- start - Right Section */}
            <Icons 
                icon={icons.AntDesign}
                iconName={'bells'}
                iconSize={27}
                iconColor={COLORS.grey}
                iconStyle={{
                    marginRight: 10
                }}
            />
            {/* ---- end - Right Section */}

        </View>

    </View>
)
}

const styles = StyleSheet.create({})