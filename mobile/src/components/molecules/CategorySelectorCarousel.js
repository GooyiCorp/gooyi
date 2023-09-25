import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import InfiniteScroll from './Scroll'

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated'


export default function CategorySelectorCarousel() {
  const list = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]

  const length = list.length
  const infListRef = useRef(null)
  const [data, setData] = useState(list)
    const [end, setEnd] = useState(true)
    useEffect(() => {
      setData(prev => [...prev, ... prev])
      setTimeout(() => { infListRef.current.scrollToIndex({ animated: false, index: length }) }, 500);
    }, [])

  function handleScoll({ layoutMeasurement, contentOffset, contentSize }) {
    if (data.length >= length * 3) setData(prev => prev.slice(length*2))
    if (contentOffset.y <= 20) {
      setData(prev => [...prev, ...list])
      infListRef.current.scrollToIndex({animated: false, index: length})
    }
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && end) {
      setData(prev => [...prev, ...list])
      setEnd(false)
    }
    else {
      setEnd(true)
    }
  }
  return (
    <>
    
    <View style={styles.hiddenbox}>
        <FlatList
            ref={infListRef}
            data={data}
            renderItem={({item}) => <CatergorySelectorIcons number={item.number} onPressIn={() => console.log('press')}/>}
            keyExtractor={(item, id) => id}
            pagingEnabled={true}
            snapToAlignment={'center'}
            decelerationRate={"fast"}
            onScroll={({nativeEvent}) => handleScoll(nativeEvent)}
            showsVerticalScrollIndicator={false}
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