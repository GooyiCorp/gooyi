import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';



const SearchBox = () => {
  const animation = useSharedValue(0);
  const [icon, setIcon] = useState('search')
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value==1?withTiming(200,{duration:500}):withTiming(0,{duration:500}),
      opacity: animation.value==1?withTiming(1,{duration:200}):withTiming(0,{duration:200}),
    }
  })
  return (
    <View style={{alignItems: 'flex-start'}}>
      <View style={{ flexDirection: 'row', alignItems: "center"}}>
          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {
            if (animation.value==1) {
              animation.value = 0
              setIcon('search')
            } else {
              animation.value = 1
              setIcon('close')
            }
          }} 
          >
            <Ionicons name={icon} size={20} color="black" />
          </TouchableOpacity>
        <Animated.View style={[styles.searchContainer, animatedStyle]}>
          <TextInput style={{width: '85%', margin: 10}} placeholder={'Search something...'}/>
        </Animated.View>
      </View>
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create ({
  icon: {
    width: 30,
    height: 30,
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
    marginHorizontal: 5,
  }
})