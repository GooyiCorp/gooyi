import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';



const SearchBox = () => {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value==1?withTiming(300,{duration:500}):withTiming(0,{duration:500}),
    }
  })
  return (
    <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[{width: 300, height: 50, backgroundColor: '#dfdede', borderRadius: 10, flexDirection: 'row', alignItems: 'center'}, animatedStyle,]}>
          <TextInput style={{width: '85%'}} placeholder={'Search something...'}/>
          <TouchableOpacity onPress={() => {
            if (animation.value==1) {
              animation.value = 0;
            } else {
              animation.value = 1;
            }
          }}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
    </Animated.View>
  )
}

export default SearchBox