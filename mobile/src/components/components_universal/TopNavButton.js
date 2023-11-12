import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'



export const TopNavButton = ({lists}) => {

    const [selected, setSelected] = useState(1)
    const [bgColor, setBgColor] = useState('grey')

    const handleColor = (row) => {
        setSelected(row.id)
    }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    {lists.map((list) => (
    <TouchableOpacity key={list.id} style={[styles.topNavContainer, {backgroundColor: list.id === selected? COLORS.default : COLORS.white}]} 
    onPress={() => handleColor(list)}>
        <Text style={[styles.topNavTitle, {fontFamily: list.id === selected? 'Roboto-Bold': 'Roboto-Regular'}]}>{list.title}</Text>
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
        borderRadius: 10,
    },
    topNavTitle: {
        color: COLORS.black,
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        textAlign: 'center',
    },
})
