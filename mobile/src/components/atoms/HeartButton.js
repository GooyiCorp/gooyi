import React from 'react'
import { Pressable, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'; 
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';

export default function HeartButton() {

    const liked = useSharedValue(0)

    const outlineStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              scale: interpolate(liked.value, [0, 1], [1, 0]),
            },
          ],
        };
      });
    
      const fillStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              scale: liked.value,
            },
          ],
        };
      });

    return (
        <Pressable onPress={() => (liked.value = withTiming(liked.value ? 0 : 1))}>

            <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
                <Octicons name={"heart-fill"} size={28} color={'#eeeeee'}/>
            </Animated.View>
    
            <Animated.View style={fillStyle}>
                <Octicons name={"heart-fill"} size={28} color={'#B84058'} />
            </Animated.View>

        </Pressable>
    )
}

const styles = StyleSheet.create({})