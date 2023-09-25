import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InfiniteScroll from './Scroll'

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated'




export default function CategorySelectorCarousel() {
  const [data, setData] = useState([
      {id: 1, number: 1},
      {id: 2, number: 2},
      {id: 3, number: 3},
      {id: 4, number: 4},
      {id: 5, number: 5},
      {id: 6, number: 6},
    ])


  return (
    <>
    
    <View style={styles.hiddenbox}>
        <FlatList
            data={data}
            renderItem={({item}) => <CatergorySelectorIcons number={item.number} onPressIn={() => console.log('press')}/>}
            keyExtractor={(item, id) => id}
            pagingEnabled={true}
            snapToAlignment={'center'}
            decelerationRate={"fast"}
            onEndReached={() => {setData(prev => [...prev, data])}}
            onScroll={({
                nativeEvent: {contentOffset: { y },
                },
            }) => {
                if ( y <= 0) {
                    console.log(0)
                }
            }}
        />
    </View>
    </>
  )
}

const styles = StyleSheet.create({

    hiddenbox: {
        height: 50,
        width: 50,
       // justifyContent: 'center',
        backgroundColor: 'yellow',
        overflow: 'visible'
      }

})