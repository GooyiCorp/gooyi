import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withRepeat } from 'react-native-reanimated'
import { COLORS } from '../../../index/constantsindex'
import { H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import Icons, { icons } from '../../components_universal/Icons'
import { useNavigation } from '@react-navigation/native'
import HeartButton from '../../components_universal/HeartButton'

// ---------------------------------------------------------------------------------------------------------------------

const imgBoxWidth = 246
const imgBoxHeight = 115

// Test API
const shopName = 'NOOSOO Asia Kitchen'
const rating = 'n.d.'
const header = 'Udon für 2 Person Udon für 2 Person '
const information = '+ 2 Getränke nach Wahl'
const price = '28,90'
const offerPrice = '17,50 €'
const distance = '1,2 km'

// ---------------------------------------------------------------------------------------------------------------------

export default function NewOfferBox() {

  // React Navigation
  const navigation = useNavigation()
  
  // Value --------------------------------------------------------------- Transition
  const [focus, setFocus] = useState(false)
  const [boxWidth, setBoxWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  
  const imgBoxDiagonal = Math.sqrt( Math.pow(imgBoxWidth,2) + Math.pow(imgBoxHeight,2) )
  //const degree = (Math.atan( imgBoxHeight/imgBoxWidth ) * ( 180/Math.PI )) + 'deg'   

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

  const handleOnPressCard = () => {
    navigation.navigate('OfferCardDetail')
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
          <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3, position: 'absolute', zIndex: 1}, flashOverlay]}></Animated.View>
          <Image 
            source={require('../../../../assets/image/test.jpg')}
            resizeMode='contain'
            style={{
              maxWidth: '100%',
              zIndex: 0,
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
          
          <View style={{height: '15%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={T4}>{shopName}</Text>
            {/* <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>{rating}</Text> */}
          </View>

          <View style={{height: '65%', overflow: 'hidden'}} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
            <Animated.View style={[{flexWrap: focus? 'wrap' : 'nowrap'}, boxWidth > textWidth ? 0 : xVal]}>  
              <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]} ellipsizeMode='tail' onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{header}</Text>
            </Animated.View>

            <Text style={T4}>{information}</Text>
          </View>

          {/* Bottom Section */}
          <View style={{height: '20%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>

            {/* Price */}
            <View style={{flexDirection: 'row'}}>
              <Text style={[H4, {paddingRight: 10, textDecorationLine: 'line-through', textDecorationColor: COLORS.primary, color: COLORS.grey}]}>{price}</Text>
              <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>{offerPrice}</Text>
            </View>

          </View>

          {/* Heart Button */}
          <View style={{height: 30, width: 30, position: 'absolute', bottom: 10, right: 10}}>
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
    height: 253,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginRight: 15
  },

  imageBox: {
    width: imgBoxWidth,
    height: imgBoxHeight,
    backgroundColor: COLORS.noImage,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  contentBox: {
    width: 246,
    height: 138,
    backgroundColor: COLORS.ivory,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

})