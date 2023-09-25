import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { Timer } from '../../helper/timer'

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
  const [data, setData] = useState([...list,...list])
  const [render, setRender] = useState(true)
  const timer = useRef(new Timer(0))
    useEffect(() => {
      setData(prev => [...prev, ... prev])
      setTimeout(() => { infListRef.current.scrollToIndex({ animated: false, index: length }) }, 500);
    }, [])

  function handleScoll({ layoutMeasurement, contentOffset, contentSize }) {
    if (data.length >= length * 3) setData(prev => prev.slice(length*2))
    if (contentOffset.y <= 0) {
      if (timer.current.remainingTime() == 0) {
        setData(prev => {
        prev.unshift(prev.pop())
        prev.unshift(prev.pop())
          return prev
        })
        setRender(!render, infListRef.current.scrollToIndex({ animated: false, index: 2  }))
        timer.current = new Timer(100)
      }
    }
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      if (timer.current.remainingTime() == 0) {
        setData(prev => {
        prev.push(prev.shift())
        prev.push(prev.shift())
          return prev
        })
        setRender(!render, infListRef.current.scrollToIndex({ animated: false, index: data.length - 3  }))
        timer.current = new Timer(100)
      }
      
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
            scrollEventThrottle={16}
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