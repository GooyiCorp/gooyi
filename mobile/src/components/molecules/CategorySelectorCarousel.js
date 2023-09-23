import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InfiniteScroll from './Scroll'

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated'


const data = [
    {id: 1, number: 1},
    {id: 2, number: 2},
    {id: 3, number: 3},
    {id: 4, number: 4},
    {id: 5, number: 5},
    {id: 6, number: 6},
  ]

  
export default function CategorySelectorCarousel() {

    // Value --------------------------------------------------------------- Transition
    const transitionVal = useSharedValue(0)

    const [test, setTest] = useState(0)
    console.log(test)

    // UseAnimatedStyle ---------------------------------------------------- Transition
    const boxTransition = useAnimatedStyle(() =>{
        const boxScale = interpolate(transitionVal.value, [0,1], [1, 0.95])
            return {
                transform:[
                    {scale: boxScale},
                ],
            }
        }
    )

  return (
    <>
    
    <View style={styles.hiddenbox}>
        <InfiniteScroll
            data={data}
            renderItem={({item}) => <CatergorySelectorIcons number={item.number} onPressIn={() => console.log('press')}/>}
            keyExtractor={(item, id) => id}
            pagingEnabled={true}
            snapToAlignment={'center'}
            decelerationRate={"fast"}
            onTouchStart={() => setTest(1)}
        />
    </View>
    </>
  )
}

const styles = StyleSheet.create({

    hiddenbox: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        backgroundColor: 'yellow'
      }

})