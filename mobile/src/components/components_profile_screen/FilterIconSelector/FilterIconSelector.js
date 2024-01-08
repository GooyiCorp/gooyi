import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as Haptics from 'expo-haptics';


import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, withDelay, Easing, withSpring } from 'react-native-reanimated'
import {icons} from '../../components_universal/Icons'
import Carousel from 'react-native-reanimated-carousel';

import { COLORS } from '../../../index/constantsindex';
import MaskView from '../../components_finder_screen/CategorySelector/MaskedView';
import MaskElement from '../../components_finder_screen/CategorySelector/MaskElement';
import CategoryIconButton from '../../components_discover_screen/CategoryButtonSelector/CategoryIconButton';
import { height } from '../../../constants/size';

export default function FilterIconSelector() {
  const list = [
    { 
        id: 0, 
        type: icons.MaterialIcons,
        ico: 'restaurant',
        size: 20,
        bgColor: '#FFB756'
      },
      { 
        id: 1, 
        type: icons.MaterialCommunityIcons,
        ico: 'coffee',
        size: 21,
        bgColor: '#D1ABAA'
      },
      { 
        id: 2, 
        type: icons.MaterialCommunityIcons,
        ico: 'gamepad-square',
        size: 22,
        bgColor: '#758a92'
      },
      { 
        id: 3, 
        type: icons.MaterialCommunityIcons,
        ico: 'book',
        size: 21,
        bgColor: '#da6178'
      },
      { 
        id: 4, 
        type: icons.MaterialCommunityIcons,
        ico: 'shopping',
        size: 20,
        bgColor: '#4a6c98'
      },
      { 
        id: 5, 
        type: icons.MaterialCommunityIcons,
        ico: 'heart',
        size: 21,
        bgColor: '#c52b10'
      },
  ]

//   const [data, setData] = useState([...list,...list])
  
  function handleTouchEnd(index) {
    transitionVal.value = withDelay(200, withTiming( 0, {duration: 300, easing: Easing.bezier(0.69, 0.02, 0.98, 0.72)}))
    // Thanh - show Card by Category ---------------------
    console.log(index)
    // ---------------------------------------------------
  }
  function handleTouchStart() {
    transitionVal.value = withTiming( 1, {duration: 200})
  }

        // Value --------------------------------------------------------------- Transition
        const transitionVal = useSharedValue(0)
      
        // UseAnimatedStyle ---------------------------------------------------- Transition
        const transition = useAnimatedStyle(() => {
            return {
                height: interpolate(transitionVal.value, [0,1], [50, 88]),
                transform: [
                    {scale: interpolate(transitionVal.value, [0,1], [1, 0.85])}
                ]
            }
        })

  return (
    <View style={{height: 88, width: 40, justifyContent: 'center', alignItems: 'center', marginRight: -5}}>
        <Animated.View style={[{ height: 88, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }, transition]}>
            <MaskView 
                element={<MaskElement />
            }>
                <View 
                    style={styles.hiddenbox}
                    onTouchStart={() => handleTouchStart()}
                    onTouchEnd={() => handleTouchEnd()}
                >
                    <Carousel 
                        data={list}
                        style={{
                            overflow: 'visible'
                        }}
                        vertical
                        loop
                        width={44}
                        height={44}
                        scrollAnimationDuration={200}
                        onSnapToItem={(index) => handleTouchEnd(index)}
                        renderItem={({item}) => (
                            <CategoryIconButton 
                                icon={item.type} 
                                iconName={item.ico} 
                                iconSize={item.size} 
                                iconColor={COLORS.mainBackground} 
                                style={{
                                    backgroundColor: item.bgColor,
                                    height: 30,
                                    width: 30
                                }} 
                            />
                        )}
                    />
                </View>
            </MaskView>
        </Animated.View>
        {/* ---- Background View */}
        <View style={[styles.bgView, {position: 'absolute', zIndex: -1}]}/>
    </View>
  )
}

const styles = StyleSheet.create({

  hiddenbox: {
      height: 40,
      width: 40,
      //backgroundColor: 'grey',
      borderRadius: 50,
  },

  bgView: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  }

})