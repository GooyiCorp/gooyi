import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

const lists = [
    {id: 1, title: 'Alle'},
    {id: 2, title: 'Favoriten'},
]

export const TopNavButton = () => {

    const [selected, setSelected] = useState(0)
    const [bgColor, setBgColor] = useState('grey')

    const handleColor = (row) => {
        setSelected(row.id)
    }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
    {lists.map((list) => (
    <TouchableOpacity key={list.id} style={[styles.topNavContainer, {backgroundColor: list.id === selected? '#eeeeee': 'rgba(238, 238, 238, 0)'}]} 
    onPress={() => handleColor(list)}>
        <Text style={[styles.topNavTitle, {fontFamily: list.id === selected? 'Roboto-Bold': 'Roboto-Medium'}]}>{list.title}</Text>
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
        height: 30,
        marginHorizontal: 5,
        borderRadius: '50%',
    },
    topNavTitle: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        textAlign: 'center',
    },
})
