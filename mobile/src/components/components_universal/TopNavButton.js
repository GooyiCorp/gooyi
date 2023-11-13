import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import { setCouponNavPage, setStoreNavPage } from '../../redux/slices/subNavSlice'
import { useDispatch } from 'react-redux'
import { T2, T3, T4 } from '../../constants/text-style'



export const TopNavButton = ({lists}) => {

    const dispatch = useDispatch()

    const [selected, setSelected] = useState(1)
    const [bgColor, setBgColor] = useState('grey')

    const handlePressed = (row) => {
        setSelected(row.id)
        if (row.payload == 'allStores' || row.payload ==  'favoriteStores') {
            dispatch(setStoreNavPage(row.payload))
        } else if (row.payload == 'marks' || row.payload ==  'myCoupons') {
            dispatch(setCouponNavPage(row.payload))
        }
    }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    {lists.map((list) => (
    <TouchableOpacity key={list.id} style={[styles.topNavContainer, {backgroundColor: list.id === selected? COLORS.default : COLORS.white}]} 
    onPress={() => handlePressed(list)}>
        <Text style={[T2, {color: list.id === selected? COLORS.black: COLORS.grey, fontFamily: list.id === selected? 'RH-Medium': 'RH-Regular'}]}>{list.title}</Text>
    </TouchableOpacity>
    ))}
    </View>
  )
}

const styles = StyleSheet.create({
    topNavContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 36,
        borderRadius: 50,
    },
    topNavTitle: {
        color: COLORS.black,
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        textAlign: 'center',
    },
})
