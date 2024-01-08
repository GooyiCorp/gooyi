import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
// Reanimated
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withRepeat, withTiming, withDelay, withSequence } from 'react-native-reanimated'
// Vector Icons
import { MaterialCommunityIcons } from '@expo/vector-icons'
// Constant
import { COLORS } from '../../index/constantsindex'
import { T1, T3, T4 } from '../../constants/text-style'
// Components
import HeartButton from '../components_universal/HeartButton'
import Icons, { icons } from '../components_universal/Icons'



const imgBoxWidth = 246
const imgBoxHeight = 180*0.55

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function NewShopsBox({
  store_id,
  shopName,
  description,
  distance,
  onPressCard,
}) {

  // ----------------------------  
  // Animation Section
  // ---------------------------- 
    // ---- Value Section
    const [boxWidth, setBoxWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)
    const [focus, setFocus] = useState(false)

    const imgBoxDiagonal = Math.sqrt( Math.pow(imgBoxWidth,2) + Math.pow(imgBoxHeight,2) )

    const flashValue = useSharedValue(0)
    const transitionVal = useSharedValue(0)
    const textAnimation = useSharedValue(0)

    // ---- Animated Style
      // Flash Style
      const flashOverlay = useAnimatedStyle(() => {
        return {
          transform:[
            {rotate: '45deg'},
            {translateX: interpolate(flashValue.value, [0,1], [imgBoxDiagonal, 0])},
          ],
        }
      })
      // Scale Card Container Style 
      const boxTransition = useAnimatedStyle(() =>{
        return {
          transform:[
            {scale: interpolate(transitionVal.value, [0,1], [1, 0.95])},
          ],
        }
      })
      // Text Animation Style
      const xVal = useAnimatedStyle(() =>{
        return {
          transform:[
            {translateX: interpolate(textAnimation.value, [0,1], [0, boxWidth - textWidth])},
          ],
        }
      })
      // Logo Opacity Style
      const opacity = useAnimatedStyle(() =>{
        return {
          opacity: interpolate(transitionVal.value, [0,1], [0.8, 1])
        }
      })
    
  

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
  // Touch
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
    onPress={onPressCard}
  >
  {/* ---- start - Card Container Section */}
  <Animated.View style={[styles.boxContainer, boxTransition]}>
    {/* ------------------------------------------------ */}
    {/* Image Container */}
    {/* ------------------------------------------------ */}
    <View style={styles.imageBox}>
      {/* ---- Logo Area */}
      <Animated.View style={[styles.logoBox, opacity]}>
        <Image 
          source={require('../../../assets/image/Yoko_Logo_WEB.png')}
          resizeMode='contain'
          style={{
            maxWidth: '80%'
          }}
        />
      </Animated.View>
      {/* ---- Flash Overlay */}
      <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3, position: 'absolute', zIndex: 1}, flashOverlay]}></Animated.View>
      {/* ---- Main Image */}
      <Image 
        source={require('../../../assets/image/test.jpg')}
        resizeMode='contain'
        style={{
          maxWidth: '100%'
        }}
      />
    </View>

    {/* ------------------------------------------------ */}
    {/* Info Container */}
    {/* ------------------------------------------------ */}
    <View style={styles.contentBox}>

      {/* ---- start - Info Area */}
      <View style={{height: '100%', overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'space-between'}} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
        
        {/* ---- Store Information */}
        <View>
          {/* Shop Name Area */}
          <Animated.View style={[{flexWrap: focus? 'wrap' : 'nowrap'}, boxWidth > textWidth ? 0 : xVal]}>  
              <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{shopName}</Text>
          </Animated.View>
          {/* Sub Text Area */}
          <Text style={T3}>{description}</Text>
        </View>

        {/* ---- Distance */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -2}}>
          <MaterialCommunityIcons name="map-marker" size={14} color='#B84058'/>
          <Text style={[T4, { marginLeft: 2 }]}>{parseFloat(distance / 1000).toFixed(2)} km</Text>
        </View>

      </View>
      {/* ---- end - Info Area */}

      {/* ---- Heart Button */}
      <View style={{height: 30, width: 30, position: 'absolute', bottom: 10, right: 10, justifyContent: 'center', alignItems: 'center'}}>
        <HeartButton 
          icon={icons.MaterialIcons}
          iconName={'favorite'}
          iconSize={30}
        />
      </View>

    </View>
  </Animated.View>
  {/* ---- end - Card Container Section */}
  </Pressable>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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