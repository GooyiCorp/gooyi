import React from 'react'
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons, Octicons } from '@expo/vector-icons'; 
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';
import { COLORS } from '../../index/constantsindex';

export default function HeartButton({
  style
}) {

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
            <Animated.View style={[StyleSheet.absoluteFill, outlineStyle]}>
                <Ionicons name={"heart"} size={30} color={COLORS.grey}/>
            </Animated.View>
    
            <Animated.View style={fillStyle}>
                <Ionicons name={"heart"} size={30} color={'#B84058'} />
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({})