import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withRepeat, withTiming, withDelay, withSequence } from 'react-native-reanimated'
import HeartButton from '../atoms/HeartButton'

// ---------------------------------------------------------------------------------------------------------------------

const imgBoxWidth = 220
const imgBoxHeight = 88

const shopName = 'mai-mai'
const points = 450

export default function StoreCard({
    shopName,
}   

) {
    
    // Value --------------------------------------------------------------- Transition
    const [boxWidth, setBoxWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)

    const imgBoxDiagonal = Math.sqrt( Math.pow(imgBoxWidth,2) + Math.pow(imgBoxHeight,2) )

    const flashValue = useSharedValue(0)
    const transitionVal = useSharedValue(0)
    const textAnimation = useSharedValue(0)

    // UseAnimatedStyle ---------------------------------------------------- Transition

    const flashOverlay = useAnimatedStyle(() =>{
        const translatePosition = interpolate(flashValue.value, [0,1], [imgBoxDiagonal, 0])
            return {
                transform:[
                    {rotate: '45deg'},
                    {translateX: translatePosition},
                ],
            }
        }
    )

    const boxTransition = useAnimatedStyle(() =>{
        const boxScale = interpolate(transitionVal.value, [0,1], [1, 0.95])
            return {
                transform:[
                    {scale: boxScale},
                ],
            }
        }
    )

    const xVal = useAnimatedStyle(() =>{
        const move = interpolate(textAnimation.value, [0,1], [0, boxWidth - textWidth])
            return {
                transform:[
                    {translateX: move},
                ],
            }
        }
    )

    const opacity = useAnimatedStyle(() =>{
        const opacityTransition = interpolate(transitionVal.value, [0,1], [0.8, 1])
            return {
                opacity: opacityTransition
            }
        }
      )
       
// ---------------------------------------------------------------------------------------------------------------------

  return (
    
    <Pressable
        onPressIn={ () => ( 
            flashValue.value = withTiming( 1, {duration: 300}), 
            transitionVal.value = withTiming(1, {duration: 100}),
            textAnimation.value = withRepeat( withDelay(500, withSequence( withTiming(1, {duration: 1000}), withDelay(1000, withTiming(0, {duration: 1000})), withDelay(2000, withTiming(0)) ) ), -1 )  
        ) } 
        onPressOut={ () => ( 
            flashValue.value = withTiming(2, {duration: 300}, (finished) => (flashValue.value = 0)), 
            transitionVal.value = withTiming(0, {duration: 100}) ,
            textAnimation.value = 0
        ) }
    >

    <Animated.View style={[styles.shadowProp, boxTransition]}>
        <View style={styles.boxContainer}>
            
            {/* Image Box ---------------------------------------------------------------------------------------------------------- */}
            <View style={styles.imageBox}>
                <Animated.View style={[styles.logoBox, opacity]}></Animated.View>
                <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3}, flashOverlay]}></Animated.View>
            </View>

            {/* Content Box -------------------------------------------------------------------------------------------------------- */}
            <View style={styles.contentBox}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#696969'}}>{shopName}</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Roboto-Bold', fontSize: 22, color: '#696969'}}>{points}</Text>
                    <Text style={{fontFamily: 'Roboto-Light', fontSize: 18, color: '#696969'}}> P</Text>
                </View>

                <View style={{bottom: 8, right: 10, position: 'absolute'}}>
                    <HeartButton />
                </View>
            </View>


        </View>
    </Animated.View>

    </Pressable>

  )
}

const styles = StyleSheet.create({

    boxContainer: {
        width: 363,
        height: 88,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      imageBox: {
        width: imgBoxWidth,
        height: imgBoxHeight,
        backgroundColor: '#cccccc',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
    
      contentBox: {
        width: 143,
        height: 88,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
      },

      shadowProp: {
        width: 363,
        height: 88,
        backgroundColor: '#ffffff',
        borderRadius: 16,
    
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
      },

      logoBox: {
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.8,
        left: 13,
      },

})