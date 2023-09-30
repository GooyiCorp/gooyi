import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as Haptics from 'expo-haptics';

import CatergorySelectorIcons from '../atoms/CategorySelectorIcons'
import { Timer } from '../../helper/timer'
import MaskView from '../atoms/MaskedView'
import MaskElement from '../atoms/MaskElement'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, withDelay, Easing, withSpring } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import {icons} from '../atoms/Icons'

export default function CategorySelectorCarousel() {
  const list = [
    { 
      id: 0, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'red'
    },
    { 
      id: 1, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'yellow'
    },
    { 
      id: 2, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'green'
    },
    { 
      id: 3, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'blue'
    },
    { 
      id: 4, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'magenta'
    },
    { 
      id: 5, 
      type: icons.MaterialCommunityIcons,
      ico: 'shield-account',
      size: 20,
      bgColor: 'aquamarine'
    },
  ]

  const [visibility, setVisibility] = useState('visible')
  const length = list.length
  const infListRef = useRef(null)
  const [data, setData] = useState([...list,...list])
  console.log(data)
  const [render, setRender] = useState(true)
  

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
    <View style={styles.hiddenbox}
      onTouchStart={() => handleTouchStart()}
      onTouchEnd={() => handleTouchEnd()}
    >
      <Carousel 
            style={{overflow: 'visibility'}}
          vertical
          loop
          width={50}
          height={50}
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
    <View style={[styles.hiddenbox, {position: 'absolute', zIndex: -1}]}/>
    </>
  )
}

const styles = StyleSheet.create({

    hiddenbox: {
        height: 50,
        width: 50,
        backgroundColor: 'grey',
        borderRadius: 50,
      }

})