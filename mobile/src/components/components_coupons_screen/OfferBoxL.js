import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withRepeat } from 'react-native-reanimated'
import { COLORS } from '../../index/constantsindex'
import { H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
import Icons, { icons } from '../components_universal/Icons'
import { useNavigation } from '@react-navigation/native'
import HeartButton from '../components_universal/HeartButton'
import { width } from '../../constants/size'

// Image Box Size
const imgBoxHeight = 138

// Test API
const shopName = 'NOOSOO Asia Kitchen'
const header = 'Udon für 2 Person Udon für 2 Person '
const information = '+ 2 Getränke nach Wahl'
const price = '28,90'
const offerPrice = '17,50 €'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function OfferBoxL({

}) {

// React Navigation
const navigation = useNavigation()
  
  // ----------------------------  
  // Animation Section
  // ---------------------------- 
    // ---- Value Section
    const [focus, setFocus] = useState(false)
    const [boxWidth, setBoxWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)

    const [imageBoxWidth, setImageBoxWidth] = useState(0)

    const imgBoxDiagonal = Math.sqrt( Math.pow(imageBoxWidth,2) + Math.pow(imgBoxHeight,2) )
    //const degree = (Math.atan( imgBoxHeight/imgBoxWidth ) * ( 180/Math.PI )) + 'deg'   

    const flashValue = useSharedValue(0)
    const transitionVal = useSharedValue(0)
    const textAnimation = useSharedValue(0)

    // ---- Animated Style
      // Flash Style
      const flashOverlay = useAnimatedStyle(() =>{
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

  const handleOnPressCard = () => {
    navigation.navigate('OfferCardDetail')
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
      onPress={handleOnPressCard}
    >

    {/* ---- start - Card Container Section */}
    <Animated.View style={[styles.boxContainer, boxTransition]}>
        {/* ------------------------------------------------ */}
        {/* Image Container */}
        {/* ------------------------------------------------ */}
        <View style={styles.imageBox} onLayout={(e) => setImageBoxWidth(e.nativeEvent.layout.width)}>
            {/* ---- Flash Overlay */}
            <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3, position: 'absolute', zIndex: 1}, flashOverlay]}></Animated.View>
            {/* ---- Main Image */}
            <Image 
                source={require('../../../assets/image/test.jpg')}
                resizeMode='contain'
                style={{
                maxHeight: '100%',
                zIndex: 0,
                }}  
            />
          
        </View>

        {/* ------------------------------------------------ */}
        {/* Info Container */}
        {/* ------------------------------------------------ */}
        <View style={styles.contentBox}>

            {/* ---- start - Info Area */}
            <View style={{height: '65%', overflow: 'hidden'}} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
                {/* Shop Name */}
                <Text style={[T4, {marginBottom: 2}]}>{shopName}</Text>
                {/* Offer Title */}
                <Animated.View style={[{flexWrap: focus? 'wrap' : 'nowrap'}, boxWidth > textWidth ? 0 : xVal]}>  
                    <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]} ellipsizeMode='tail' onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{header}</Text>
                </Animated.View>
                {/* Offer Details */}
                <Text style={T4}>{information}</Text>
             </View>
            {/* ---- end - Info Area */}

            {/* ---- start - Price Area */}
            <View style={{flexDirection: 'row'}}>
                {/* Price Start */}
                <Text style={[H4, {paddingRight: 10, textDecorationLine: 'line-through', textDecorationColor: COLORS.primary, color: COLORS.grey}]}>{price}</Text>
                {/* Price After  */}
                <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>{offerPrice}</Text>
            </View>
            {/* ---- end - Price Area */}

            {/* Heart Button */}
            <View style={{height: 30, width: 30, position: 'absolute', bottom: 10, right: 10}}>
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
    width: width-60,
    height: 138,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  imageBox: {
    width: '35%',
    height: imgBoxHeight,
    backgroundColor: COLORS.noImage,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  contentBox: {
    width: '65%',
    height: 138,
    backgroundColor: COLORS.ivory,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

})