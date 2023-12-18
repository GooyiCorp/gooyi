import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'
import IconLabelButton from './IconLabelButton'
import { T4 } from '../../constants/text-style'

const distance = '1,2 km'
const shopName = 'NOUSOU'
const validity = '30.06.2023'

export default function CouponCard() {

    // Value --------------------------------------------------------------- Transition
    const transitionVal = useSharedValue(0)

    // UseAnimatedStyle ---------------------------------------------------- Transition
    const boxTransition = useAnimatedStyle(() =>{
        const boxScale = interpolate(transitionVal.value, [0,1], [1, 0.95])
            return {
                transform:[
                    {scale: boxScale},
                ],
            }
        }
      )

  return (

    <Pressable 
      onPressIn={ () => ( 
        transitionVal.value = withTiming(1, {duration: 100})
      ) } 
      onPressOut={ () => ( 
        transitionVal.value = withTiming(0, {duration: 100})
      ) }
    >

    <Animated.View style={[styles.shadowProp, boxTransition]}>
        <View style={styles.contentBox}>

        <View style={{height: '15%'}}>
            <Text style={T4}>{shopName}</Text>
            
        </View>

        <View style={{height: '40%'}}>
        </View>

        {/* Bottom Section */}
        <View style={{height: '45%', alignItems:'flex-start', justifyContent: 'flex-end'}}>
          
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 1}}>
          <Entypo name="time-slot" size={12} color={COLORS.grey} />
          <Text style={[T4, {marginLeft: 5}]}>{validity}</Text>
          </View>
          {/* Distance */}
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name="map-marker" size={14} color={COLORS.primary}/>
            <Text style={[T4, {marginLeft: 5}]}>{distance}</Text>
          </View>

        </View>

        {/* Button */}
        <View style={{position: 'absolute', bottom: 10, right: 10}}>
            <IconLabelButton 
              label={'Einlösen'}
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 15,
              }}
              labelStyle={{
                fontFamily: 'RH-Medium',
                color: COLORS.grey
              }}
            />
        </View>

        </View>
    </Animated.View>

    </Pressable>
    
  )
}

const styles = StyleSheet.create({

      contentBox: {
        width: 246,
        height: 138,
        backgroundColor: COLORS.ivory,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        overflow: 'hidden',
      },

})