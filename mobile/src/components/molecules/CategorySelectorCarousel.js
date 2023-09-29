import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { Timer } from '../../helper/timer'
import MaskView from '../atoms/MaskedView'
import MaskElement from '../atoms/MaskElement'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, withDelay, Easing, withSpring } from 'react-native-reanimated'

export default function CategorySelectorCarousel() {
  const list = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]

  const [visibility, setVisibility] = useState('visible')
  const length = list.length
  const infListRef = useRef(null)
  const [data, setData] = useState([...list,...list])
  console.log(data)
  const [render, setRender] = useState(true)
  const timer = useRef(new Timer(0))
    // useEffect(() => {
    //   setData(prev => [...prev, ... prev])
    //   setTimeout(() => { infListRef.current.scrollToIndex({ animated: false, index: length }) }, 500);
    // }, [])

  function handleScoll({ layoutMeasurement, contentOffset, contentSize }) {
    //if (data.length >= length * 3) setData(prev => prev.slice(length*2))
    if (contentOffset.y <= 0) {
      if (timer.current.remainingTime() == 0) {
        setData(prev => {
        prev.unshift(prev.pop())
        //prev.unshift(prev.pop())
        //prev.unshift(prev.pop())
        
          return prev
        })
        setRender(!render, infListRef.current.scrollToIndex({ animated: false, index: 1}))
        timer.current = new Timer(200)
        
      }
    }
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      if (timer.current.remainingTime() == 0) {
        setData(prev => {
        prev.push(prev.shift())
        //prev.push(prev.shift())

          return prev
        })
        //setRender(!render)
        setRender(!render, infListRef.current.scrollToIndex({ animated: false, index: data.length - 2}))
        timer.current = new Timer(200)
      }
      
    }

  }

        // Value --------------------------------------------------------------- Transition
        const transitionVal = useSharedValue(0)
      
        // UseAnimatedStyle ---------------------------------------------------- Transition
      
        const transition = useAnimatedStyle(() => {
          const translateHeight = interpolate(transitionVal.value, [0,1], [60, 150])
          const scale = interpolate(transitionVal.value, [0,1], [1, 1.05])
              return {
                  height: translateHeight,
                  transform: [{scale: scale}]
              }
          }
        )

  return (
    <>
    <Animated.View style={[{ height: 150, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, transition]}>
    <MaskView element={<MaskElement />}>
    <View style={styles.hiddenbox}>
        <FlatList
            style={{overflow: visibility}}
            ref={infListRef}
            data={data}
            renderItem={({item}) => <CatergorySelectorIcons number={item.number} onPressIn={() => console.log('press')}/>}
            keyExtractor={(item, id) => id}
            pagingEnabled={true}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            onScroll={({nativeEvent}) => handleScoll(nativeEvent)}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onTouchStart={() => transitionVal.value = withTiming( 1, {duration: 300})}
            onTouchEnd={() => transitionVal.value = withDelay(300, withTiming( 0, {duration: 400, easing: Easing.bezier(0.69, 0.02, 0.98, 0.72)}))}
            //initialScrollIndex={6}
        />
    </View>
    </MaskView>
    </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({

    hiddenbox: {
        height: 50,
        width: 50,
        backgroundColor: 'yellow',
        borderRadius: 50,
      }

})