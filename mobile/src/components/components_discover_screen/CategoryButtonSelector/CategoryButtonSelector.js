import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as Haptics from 'expo-haptics';


import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, withDelay, Easing, withSpring } from 'react-native-reanimated'
import {icons} from '../../components_universal/Icons'
import Carousel from 'react-native-reanimated-carousel';
import CatergorySelectorIcons from '../../components_finder_screen/CategorySelector/CategorySelectorIcons';
import MaskElement from '../../components_finder_screen/CategorySelector/MaskElement';
import MaskView from '../../components_finder_screen/CategorySelector/MaskedView';
import CategoryIconButton from './CategoryIconButton';
import { COLORS } from '../../../index/constantsindex';

export default function CategoryButtonSelector() {
  const list = [
    { 
        id: 0, 
        type: icons.MaterialCommunityIcons,
        ico: 'percent',
        size: 23,
    },
    { 
        id: 1, 
        type: icons.MaterialCommunityIcons,
        ico: 'ticket-percent',
        size: 21,
    },
    { 
        id: 2, 
        type: icons.FontAwesome5,
        ico: 'store',
        size: 15
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
    <View style={{height: 88, justifyContent: 'center', alignItems: 'center', marginRight: -5}}>
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
                                iconColor={COLORS.grey} 
                                style={{backgroundColor: COLORS.ivory}} 
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
    backgroundColor: COLORS.grey,
    borderRadius: 8,
  }

})