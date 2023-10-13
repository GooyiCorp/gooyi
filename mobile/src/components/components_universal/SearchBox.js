import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import RoundButton from './RoundButton';
import { icons } from './Icons';
import { COLORS } from '../../index/constantsindex';
import { moderateScale } from '../../helper/scale';
import { height, width } from '../../constants/size';



const SearchBox = ({onPressSearch, transitionVal}) => {
  console.log(transitionVal)
  const animation = useSharedValue(0);

  animation.value = withTiming(transitionVal, {duration: 500})

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animation.value, [0, 1], [200, 0])
    return {
      width: translateX,
    }
  })

  // const handlePress = () => {
  //   if (animation.value == 1) {
  //     animation.value = 0
  //     setName('search')
  //   } else {
  //     animation.value = 1
  //     setName('close')
  //   }
  // }

  

  return (
    <View style={{alignItems: 'flex-start'}}>
      <View style={{ flexDirection: 'row', alignItems: "center"}}>
        <RoundButton 
          icon={icons.Ionicons} 
          iconName={transitionVal == 1? 'search': 'close'} 
          iconSize={transitionVal == 1? 22: 26} 
          iconColor={COLORS.subPrimary} 
          onPressButton={onPressSearch}
          style={{
            backgroundColor: COLORS.subPrimary02,
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            marginLeft: 0,
            marginRight: 5
          }}
        />

          <TouchableWithoutFeedback onPressOut={Keyboard.dismiss()} accessible={false}>
            
        <Animated.View style={[styles.searchContainer, animatedStyle]}>
            <TextInput 
              style={{width: '85%', margin: 10}} 
              placeholder={'Search something...'}
            />
        </Animated.View>

          </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create ({
  icon: {
    width: 36,
    height: 36,
    backgroundColor: '#eeeeee',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  searchContainer: {
    width: 200,
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    justifyContent: 'center',
    position: 'absolute',
    marginLeft: 48,
  }
})