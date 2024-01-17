import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
// Reanimated
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withRepeat, withTiming, withDelay, withSequence } from 'react-native-reanimated'
// Vector Icons
import { MaterialCommunityIcons } from '@expo/vector-icons'
// Constant
import { COLORS } from '../../index/constantsindex'
import { T1, T2, T3, T4 } from '../../constants/text-style'
import { height, width } from '../../constants/size'
// Components
import HeartButton from '../components_universal/HeartButton'
import Icons, { icons } from '../components_universal/Icons'
import CategoryType from './CategoryType'
import Request from '../../helper/request.js'
import { useSelector } from 'react-redux'



const imgBoxWidth = width-60
const imgBoxHeight = 200*0.6

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function StoreCard({
    onPress,
    newshop,
    store_id,
    shopName,
    description,
    distance,
    liked,
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
      const boxTransition = useAnimatedStyle(() => {
        return {
          transform:[
            {scale: interpolate(transitionVal.value, [0,1], [1, 0.95])},
          ],
        }
      })
      // Text Animation Style
      const xVal = useAnimatedStyle(() => {
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
  const accessToken = useSelector(state => state.user.accessToken)
  const handleLike = async () => {
    const response = await Request('user/store/like', 'POST', {store_id}, accessToken)
    if (!response.success) alert(response.message)
  }
       
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
    onPress={onPress}
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
          source={require('../../../assets/image/datbackhus.png')}
          resizeMode='contain'
          style={{
            maxWidth: '80%'
          }}
        />
      </Animated.View>
      {/* ---- Badges Area */}
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 10, zIndex: 2}}>
        {/* New Shop Badge */}
        {newshop && 
          <View style={{height: 30, backgroundColor: COLORS.white, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 8}}>
            <Text style={[T1, {fontFamily: 'RH-Black', color: COLORS.primary, textTransform: 'uppercase'}]}>New</Text>
          </View>
        }
        {/* Category Type Badge */}
        <CategoryType 
          edge={30}
          type={'restaurant'}
        />
      </View>
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
      <View style={{width: '90%', height: '100%', paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'space-between', overflow: 'hidden' }} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
        
        {/* ---- Shop Name Area */}
        <Animated.View style={[{flexWrap: focus? 'wrap' : 'nowrap'}, boxWidth > textWidth ? 0 : xVal]}>  
          <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{shopName}</Text>
        </Animated.View>
        {/* ---- Sub Text Area */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Distance */}
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: -2}}>
            <MaterialCommunityIcons name="map-marker" size={14} color='#B84058'/>
            <Text style={[T4, {marginLeft: 2}]}>{parseFloat(distance/1000).toFixed(2)} km</Text>
          </View>
          {/* BulletPoint */}
          <View style={styles.bulletPoint}></View>
          {/* Keywords */}
          <Text style={T3}>{description}</Text>
        </View>

      </View>
      {/* ---- end - Info Area */}

      {/* ---- Heart Button */}
      <View style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, right: 10}}>
        <HeartButton 
          icon={icons.MaterialIcons}
          iconName={'favorite'}
          iconSize={30}
          Action={handleLike}
          value={liked ? 1 : 0}
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
    width: width-60,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  imageBox: {
    width: '100%',
    height: '65%',
    backgroundColor: COLORS.noImage,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  contentBox: {
    width: '100%',
    height: '35%',
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
    zIndex: 2,
  },

  bulletPoint: {
    width: 5,
    height: 5, 
    backgroundColor: COLORS.grey, 
    borderRadius: 10,
    marginHorizontal: 8
  },

})