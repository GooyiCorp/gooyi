import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

// const number = 1


const lists=[
    {id: 1, number: '1'},
    {id: 2, number: '5'},
    {id: 3, number: '3'}
]

export default function SortByShop() {

    const [selected, setSelected] = useState(1)
    const [bgColor, setBgColor] = useState('grey')

    const handleColor = (row) => {
        setSelected(row.id)
    }

    //     // Value --------------------------------------------------------------- Transition
    //     const transitionVal = useSharedValue(0)

    //     // UseAnimatedStyle ---------------------------------------------------- Transition
    //    const boxTransition = useAnimatedStyle((list) =>{
    //        const boxScale = interpolate(transitionVal.value, [0,1], [1, 0.95])
    //        const boxUnScale = interpolate(transitionVal.value, [0,1], [0.95, 1])
    //            return {
    //                transform:[
    //                    {scale: list.id === selected? boxScale:  boxUnScale},
    //                ],
    //            }
    //        }
    //      )

  return (

    <View style={{flexDirection: 'row', alignItems: 'center'}} >
        {lists.map((list) => (

            <TouchableOpacity 
                key={list.id} 
                style={styles.shadowProp} 
                onPress={() => handleColor(list)}
            >

                <View style={[styles.container, {opacity: list.id === selected?  0.2 : 0 } ]}></View>
                    <Text style={{position: 'absolute', top: 10, right: 10, fontFamily: 'Roboto-Regular', fontSize: 12}}>{list.number}</Text>

            </TouchableOpacity>
        
        ))}
            </View>

    // <Pressable 
    //     onPressIn={ () => ( 
    //     transitionVal.value = withTiming(1, {duration: 100})
    //     ) } 
    //     onPressOut={ () => ( 
    //     transitionVal.value = withTiming(0, {duration: 100})
    //     ) }
    // >

    // <Animated.View style={[styles.shadowProp, boxTransition]}>
    //     <View style={styles.container}>
    //         <Text style={{position: 'absolute', top: 10, right: 10, fontFamily: 'Roboto-Regular', fontSize: '12'}}>{number}</Text>

    //     </View>
    // </Animated.View>

    // </Pressable>

  )
}

const styles = StyleSheet.create({
    
    container: {
        width: 80,
        height: 80,
        backgroundColor: '#000000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      },

      shadowProp: {
        width: 80,
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginLeft: 10,
    
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
      },

})



// export const TopNavButton = ({lists}) => {

//     const [selected, setSelected] = useState(1)
//     const [bgColor, setBgColor] = useState('grey')

//     const handleColor = (row) => {
//         setSelected(row.id)
//     }
//   return (
//     <View style={{flexDirection: 'row', alignItems: 'center'}} >
//     {lists.map((list) => (
//     <TouchableOpacity key={list.id} style={[styles.topNavContainer, {backgroundColor: list.id === selected? '#eeeeee': 'rgba(238, 238, 238, 0)'}]} 
//     onPress={() => handleColor(list)}>
//         <Text style={[styles.topNavTitle, {fontFamily: list.id === selected? 'Roboto-Bold': 'Roboto-Medium'}]}>{list.title}</Text>
//     </TouchableOpacity>
//     ))}
//     </View>
//   )
// }