import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CustomButton from '../atoms/CustomButton'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const distance = '1,2 km'
const shopName = 'mai-mai'
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

        <View style={{height: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#696969'}}>{shopName}</Text>
            <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                <MaterialCommunityIcons name="map-marker" size={14} color='#B84058' />
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#696969', marginLeft: 3}}>{distance}</Text>
            </View>
        </View>

        <View style={{height: 70}}>
        </View>

        <View style={{height: 15}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 10, color: '#696969', marginLeft: 3}}>Gültig bis:</Text>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#000000', marginLeft: 3}}>{validity}</Text>
        </View>

        <View style={{position: 'absolute', bottom: 10, right: 10}}>
            <CustomButton title={'Einlösen'}/>
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
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        overflow: 'hidden',
      },

      shadowProp: {
        width: 246,
        height: 138,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        margin: 30,
    
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
      },

})