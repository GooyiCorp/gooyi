import React from 'react'
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'; 
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';
import { COLORS } from '../../index/constantsindex';
import Icons from './Icons';

export default function HeartButton({
  icon,
  iconName,
  iconSize,
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
                <Icons 
                  icon={icon}
                  iconName={iconName}
                  iconSize={iconSize}
                  iconColor={COLORS.white}
                />
            </Animated.View>
    
            <Animated.View style={fillStyle}>
            <Icons 
                  icon={icon}
                  iconName={iconName}
                  iconSize={iconSize}
                  iconColor={COLORS.primary}
                />
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({})