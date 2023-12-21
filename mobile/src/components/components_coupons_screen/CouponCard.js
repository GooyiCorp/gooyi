import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'
import IconLabelButton from '../components_universal/IconLabelButton'
import { T1, T2, T3, T4 } from '../../constants/text-style'
import Icons, { icons } from '../components_universal/Icons'
import { useNavigation } from '@react-navigation/native'

const distance = '1,2 km'
const shopName = 'Yoko Sushi'
const validity = '30.06.2023'

export default function CouponCard() {

  // React Navigation
  const navigation = useNavigation()

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

      const handleOnPressCard = () => {
        navigation.navigate('CouponCardDetail')
      }

  return (

    <Pressable 
      onPressIn={ () => ( 
        transitionVal.value = withTiming(1, {duration: 100})
      ) } 
      onPressOut={ () => ( 
        transitionVal.value = withTiming(0, {duration: 100})
      ) }
      onPress={handleOnPressCard}
    >

    <Animated.View style={[styles.shadowProp, boxTransition]}>
        <View style={styles.contentBox}>

        {/* Logo Box */}
        <View style={{height: 40, width: 40, backgroundColor: COLORS.white, position: 'absolute', top: 10, right: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../assets/image/Yoko_Logo_WEB.png')} resizeMode='contain' style={{maxWidth: '80%'}}/>
        </View>

        <View style={{height: '55%'}}>
          {/* Reward Information Section */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            {/* Reward Type */}
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'ticket-percent'}
                iconSize={18}
                iconColor={COLORS.grey}
            />
            <Text style={[T4, {marginLeft: 5}]}>{shopName}</Text>
        </View>
            {/* Reward Info */}
            <View>
                {/* Title  */}
                <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>1x kostenloses Getränk</Text>
                {/* Information */}
                <Text style={[T4, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>Größe M</Text>
            </View>
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
                backgroundColor: COLORS.ivoryDark2,
                paddingHorizontal: 15,
              }}
              labelStyle={{
                fontFamily: 'RH-Medium',
                color: COLORS.ivory
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