import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';



const SearchBox = () => {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value==1?withTiming(200,{duration:500}):withTiming(0,{duration:500}),
      opacity: animation.value==1?withTiming(1,{duration:200}):withTiming(0,{duration:200}),
    }
  })
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', width: '80%'}}>
      <View style={{ flexDirection: 'row', alignItems: "center"}}>
          <TouchableOpacity 
          style={styles.icon}
          onPress={() => {
            if (animation.value==1) {
              animation.value = 0;
            } else {
              animation.value = 1;
            }
          }} 
          >
            <Ionicons name={animation.value==1?"close":"search"} size={20} color="black" />
          </TouchableOpacity>
        <Animated.View style={[styles.searchContainer, animatedStyle]}>
          <TextInput style={{width: '85%'}} placeholder={'Search something...'}/>
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
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  searchContainer: {
    width: 200,
    height: 40,
    backgroundColor: '#eeeeee',
    borderRadius: '50%',
    justifyContent: 'center',
    padding: 10,

  }
})