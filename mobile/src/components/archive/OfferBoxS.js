import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HeartButton from '../components_universal/HeartButton'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withRepeat } from 'react-native-reanimated'

// ---------------------------------------------------------------------------------------------------------------------

const imgBoxWidth = 117
const imgBoxHeight = 138

// Test API
const shopName = 'NOOSOO Asia Kitchen'
const rating = 'n.d.'
const header = 'Udon für 2 Person Udon für 2 Person '
const information = '+ 2 Getränke nach Wahl'
const price = '28,90 €'
const offerPrice = '17,50 €'
const distance = '1,2 km'

// ---------------------------------------------------------------------------------------------------------------------

export default function OfferBoxS() {

  // Value --------------------------------------------------------------- Transition
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
          <Animated.View style={[{width: imgBoxDiagonal, height: imgBoxDiagonal, backgroundColor: '#ffffff', opacity: 0.3}, flashOverlay]}></Animated.View>
        </View>

        {/* Content Box -------------------------------------------------------------------------------------------------------- */}
        <View style={styles.contentBox}>
          
          <View style={{height: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#696969'}}>{shopName}</Text>
            <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>{rating}</Text>
          </View>

          <View style={{height: 58, overflow: 'hidden'}} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
            <Animated.View style={[{flexWrap: 'wrap'}, boxWidth > textWidth ? 0 : xVal]}>  
              <Text style={{fontFamily: 'Roboto-Bold', fontSize: 16}} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)} numberOfLines={1}>{header}</Text>
            </Animated.View>

            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>{information}</Text>
          </View>

          <View style={{height: 25, flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Roboto-Light', fontSize: 18, paddingRight: 10, textDecorationLine: 'line-through', textDecorationColor: '#B84058', color: '#696969'}}>{price}</Text>
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 18, color: '#B84058'}}>{offerPrice}</Text>
          </View>

          <View style={{height: 15, flexDirection: 'row'}}>
            <MaterialCommunityIcons name="map-marker" size={14} color='#B84058' />
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#696969', marginLeft: 3}}>{distance}</Text>
          </View>
          
          <View style={{alignSelf: 'flex-end', position: 'absolute', bottom: 8, right: 10}}>
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
    height: 138,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
    flexDirection: 'row'

  },

  imageBox: {
    width: imgBoxWidth,
    height: imgBoxHeight,
    backgroundColor: '#cccccc',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  contentBox: {
    width: 246,
    height: 138,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  shadowProp: {
    width: 363,
    height: 138,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 30,

    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 7,
  },

})