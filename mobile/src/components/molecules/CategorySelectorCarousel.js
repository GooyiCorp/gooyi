import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as Haptics from 'expo-haptics';

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import MaskView from '../atoms/MaskedView'
import MaskElement from '../atoms/MaskElement'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, withDelay, Easing, withSpring } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import {icons} from '../atoms/Icons'

export default function CategorySelectorCarousel() {
  const list = [
    { 
      id: 0, 
      type: icons.MaterialIcons,
      ico: 'restaurant',
      size: 22,
      bgColor: '#FFB756'
    },
    { 
      id: 1, 
      type: icons.MaterialCommunityIcons,
      ico: 'coffee',
      size: 23,
      bgColor: '#D1ABAA'
    },
    { 
      id: 2, 
      type: icons.MaterialCommunityIcons,
      ico: 'gamepad-square',
      size: 26,
      bgColor: '#758a92'
    },
    { 
      id: 3, 
      type: icons.MaterialCommunityIcons,
      ico: 'book',
      size: 24,
      bgColor: '#da6178'
    },
    { 
      id: 4, 
      type: icons.MaterialCommunityIcons,
      ico: 'shopping',
      size: 24,
      bgColor: '#4a6c98'
    },
    { 
      id: 5, 
      type: icons.MaterialCommunityIcons,
      ico: 'heart',
      size: 23,
      bgColor: '#c52b10'
    },
  ]

  const [data, setData] = useState([...list,...list])
  
  function handleTouchEnd() {
    transitionVal.value = withDelay(300, withTiming( 0, {duration: 400, easing: Easing.bezier(0.69, 0.02, 0.98, 0.72)}))
  }
  function handleTouchStart() {
    transitionVal.value = withTiming( 1, {duration: 300})
  }

        // Value --------------------------------------------------------------- Transition
        const transitionVal = useSharedValue(0)
      
        // UseAnimatedStyle ---------------------------------------------------- Transition
      
        const transition = useAnimatedStyle(() => {
          const translateHeight = interpolate(transitionVal.value, [0,1], [60, 156])
          const scale = interpolate(transitionVal.value, [0,1], [1, 0.85])
              return {
                  height: translateHeight,
                  transform: [{scale: scale}]
              }
          }
        )

  return (
    <>
    <Animated.View style={[{ height: 156, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, transition]}>
    <MaskView element={<MaskElement />}>
    <View style={styles.hiddenbox}
      onTouchStart={() => handleTouchStart()}
      onTouchEnd={() => handleTouchEnd()}
    >
      <Carousel 
            style={{overflow: 'visibility'}}
          vertical
          loop
          width={52}
          height={52}
          // autoPlay={true}
          data={list}
          scrollAnimationDuration={200}
          onSnapToItem={(index) => handleTouchEnd()}
          renderItem={({item}) => (
            <CatergorySelectorIcons type={item.type} ico={item.ico} size={item.size} bgColor={item.bgColor} onPressIn={() => console.log('press')}/>
          )}
          
          //onTouchStart={() => console.log('touch')}
      />
    </View>
    </MaskView>
    </Animated.View>
    <View style={[styles.bgView, {position: 'absolute', zIndex: -1}]}/>
    </>
  )
}

const styles = StyleSheet.create({

    hiddenbox: {
        height: 52,
        width: 52,
        //backgroundColor: 'grey',
        borderRadius: 50,
      },

  bgView: {
    height: 42,
    width: 42,
    backgroundColor: '#c7c7c7',
    borderRadius: 50,
  }

})