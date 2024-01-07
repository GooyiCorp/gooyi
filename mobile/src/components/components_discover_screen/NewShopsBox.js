import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withRepeat, withTiming, withDelay, withSequence } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../index/constantsindex'
import { T1, T4 } from '../../constants/text-style'
import HeartButton from '../components_universal/HeartButton'
import Icons, { icons } from '../components_universal/Icons'
import { height, width } from '../../constants/size'
import { useNavigation } from '@react-navigation/native'

// ---------------------------------------------------------------------------------------------------------------------

const imgBoxWidth = 246
const imgBoxHeight = 180*0.55
// ---------------------------------------------------------------------------------------------------------------------

export default function NewShopsBox({
  store_id,
  shopName,
  description,
  distance,
}) {

    const navigation = useNavigation()
    const [focus, setFocus] = useState(false)

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
    
  
      const handleOnPressCard = () => {
        navigation.navigate('Store', {screen: 'StoreEntry', params: {store_id}})
      }
// ---------------------------------------------------------------------------------------------------------------------
    
  return (

    <Pressable 
      onPressIn={ () => ( 
        setFocus(true),
        flashValue.value = withTiming( 1, {duration: 300}), 
        transitionVal.value = withTiming(1, {duration: 100}),
        textAnimation.value = withRepeat( withDelay(500, withSequence( withTiming(1, {duration: 1000}), withDelay(1000, withTiming(0, {duration: 1000})), withDelay(2000, withTiming(0)) ) ), -1 )  
      ) } 
      onPressOut={ () => (
        setFocus(false),
        flashValue.value = withTiming(2, {duration: 300}, (finished) => (flashValue.value = 0)), 
        transitionVal.value = withTiming(0, {duration: 100}) ,
        textAnimation.value = 0
      ) }
      onPress={handleOnPressCard}
    >

    <Animated.View style={[styles.shadowProp, boxTransition]}>
        <View style={styles.boxContainer}>
            
            {/* Image Box ---------------------------------------------------------------------------------------------------------- */}
            <View style={styles.imageBox}>
                <Animated.View style={[styles.logoBox, opacity]}>
                  <Image 
                    source={require('../../../assets/image/Yoko_Logo_WEB.png')}
                    resizeMode='contain'
                    style={{
                      maxWidth: '80%'
                    }}
                  />

                    {/* <Icons 
                      icon={icons.AntDesign}
                      iconName={'picture'}
                      iconSize={30}
                      iconColor={COLORS.ivory}
                    /> */}
                </Animated.View>
                <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3, position: 'absolute', zIndex: 1}, flashOverlay]}></Animated.View>
                <Image 
                  source={require('../../../assets/image/test.jpg')}
                  resizeMode='contain'
                  style={{
                    maxWidth: '100%'
                  }}
                />
                {/* <View style={{height: '100%', width: '100%', position: 'absolute', zIndex: -1, justifyContent: 'center', alignItems: 'center'}}>
                  <Icons 
                      icon={icons.AntDesign}
                      iconName={'picture'}
                      iconSize={30}
                      iconColor={COLORS.ivoryDark}
                    />
                </View> */}
            </View>

            {/* Content Box -------------------------------------------------------------------------------------------------------- */}
            <View style={styles.contentBox}>

                <View style={{height: '70%', overflow: 'hidden'}} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
                    <Animated.View style={[{flexWrap: focus? 'wrap' : 'nowrap'}, boxWidth > textWidth ? 0 : xVal]}>  
                        <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{shopName}</Text>
                    </Animated.View>

                    <Text style={T4}>{description}</Text>
                </View>

                {/* Bottom Section */}
                <View style={{height: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>

                {/* Distance */}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="map-marker" size={14} color='#B84058'/>
                <Text style={[T4, { marginLeft: 5 }]}>{parseFloat(distance / 1000).toFixed(2)} km</Text>
                </View>

                </View>

                {/* Heart Button */}
                <View style={{height: 30, width: 30, position: 'absolute', bottom: 10, right: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <HeartButton 
                    icon={icons.MaterialIcons}
                    iconName={'favorite'}
                    iconSize={30}
                  />
                </View>

            </View>

        </View>
    </Animated.View>

    </Pressable>
  )
}

const styles = StyleSheet.create({

    boxContainer: {
        width: 246,
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'space-between',
        marginRight: 15,
      },

      imageBox: {
        width: '100%',
        height: '55%',
        backgroundColor: COLORS.noImage,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
    
      contentBox: {
        width: '100%',
        height: '45%',
        backgroundColor: COLORS.ivory,
        paddingVertical: 10,
        paddingHorizontal: 15,
      },

      logoBox: {
        width: 60,
        height: 60,
        backgroundColor: '#ffffff',
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.8,
        bottom: 10,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      },

})