import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'



// const lists=[
//     {id: 1, number: '1'},
//     {id: 2, number: '5'},
//     {id: 3, number: '3'},
//     {id: 4, number: '3'}
// ]

export default function SortByShop({
    lists
}) {

    const [selected, setSelected] = useState(0)
    const [bgColor, setBgColor] = useState('grey')

    const handleColor = (row) => {
        setSelected(row.id)
    }

  return (

    <View style={{flexDirection: 'row', alignItems: 'center'}} >
        {lists.map((list) => (

            <TouchableOpacity 
                key={list.id} 
                style={[styles.shadowProp ]} 
                onPress={() => handleColor(list)
                }
            >
                <View style={[styles.container, {borderWidth: list.id === selected?  1 : 0 }]}></View>
                    <Text style={[styles.numberStyle, {fontFamily: list.id === selected?  'Roboto-Medium' : 'Roboto-Light'}, {color: list.id === selected? '#B84058' : '#000000'}]}>{list.number}</Text>

            </TouchableOpacity>
            
        
        ))}
    </View>

  )
}

const styles = StyleSheet.create({
    
    container: {
        width: 80,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        overflow: 'hidden',

        borderWidth: 1,
        borderColor: '#B84058',
      },

      shadowProp: {
        width: 80,
        height: 80,
        borderRadius: 16,

        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
      },

      numberStyle: {
        position: 'absolute', 
        top: 10, 
        right: 10,
        fontSize: 12
      },

})

