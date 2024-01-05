import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native'
import React from 'react'
// Reanimated
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, interpolate,} from 'react-native-reanimated'
// Constants
import { COLORS } from '../../index/constantsindex'
import { T1, T2, T3, T4 } from '../../constants/text-style'



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function Category({
  title,
  number,
  onPressCategory,
}) {

  // Value --------------------------------------------------------------- Transition
  const diagonal = Math.sqrt(2)*100

  const flashValue = useSharedValue(0)
  const transitionVal = useSharedValue(0)

  // UseAnimatedStyle ---------------------------------------------------- Transition

  const flashOverlay = useAnimatedStyle(() =>{
    const translatePosition = interpolate(flashValue.value, [0,1], [diagonal, 0])
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (

  <Pressable 
    onPressIn={ () => ( flashValue.value = withTiming( 1, {duration: 400}), transitionVal.value = withTiming(1, {duration: 100}) ) } 
    onPressOut={ () => (flashValue.value = withTiming(2, {duration: 400}, (finished) => (flashValue.value = 0)), transitionVal.value = withTiming(0, {duration: 100}) ) }
    onPress={onPressCategory}
  >
    
    <View style={styles.container}>

      {/* ---- Image Container */}
      <Animated.View style={[styles.imgContainer, boxTransition]}>
        <Animated.View style={[ { height: diagonal, width: diagonal, backgroundColor: '#fff', position: 'absolute', opacity: 0.3, zIndex: 1, }, flashOverlay ]}></Animated.View>
        {/* Number Box */}
        <View style={styles.numberBox}>
          <Text style={[T2, {color: COLORS.grey, fontFamily: 'RH-Medium'}]}>{number}</Text>
        </View>
        {/* Image  */}
        <Image 
          source={require('../../../assets/image/pizza.jpg')}
          resizeMode='contain'
          style={{maxWidth: '100%'}}
        />
        {/* Case: No Picture */}
        {/* <View style={{height: '100%', width: '100%', position: 'absolute', zIndex: -1, justifyContent: 'center', alignItems: 'center'}}>
          <Icons 
              icon={icons.AntDesign}
              iconName={'picture'}
              iconSize={30}
              iconColor={COLORS.ivoryDark}
            />
        </View> */}
      </Animated.View>
      {/* ---- Category Title */}
      <Text style={[T4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>{title}</Text>

    </View>

  </Pressable>
)
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginRight: 12,
  },
  
  imgContainer: {
    height: 100,
    width: 100,
    backgroundColor: COLORS.noImage,
    borderRadius: 16,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    marginRight: 4,
  },

  number: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },

  numberBox: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: COLORS.ivory,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 8,
    zIndex: 2,
  }

})