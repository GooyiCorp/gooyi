import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, interpolate,} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'


// ---------------------------------------------------------------------------------------------------------------------

export default function Category({
  title,
  number,
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

// ---------------------------------------------------------------------------------------------------------------------

  return (
    <Pressable onPressIn={ () => ( flashValue.value = withTiming( 1, {duration: 400}), transitionVal.value = withTiming(1, {duration: 100}) ) } onPressOut={ () => (flashValue.value = withTiming(2, {duration: 400}, (finished) => (flashValue.value = 0)), transitionVal.value = withTiming(0, {duration: 100}) ) }>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={styles.container}>

        <Animated.View style={[styles.imgContainer, boxTransition]}>
          <Animated.View style={[ { height: diagonal, width: diagonal, backgroundColor: '#fff', position: 'absolute', opacity: 0.3, zIndex: 1, }, flashOverlay ]}></Animated.View>
        </Animated.View>


        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.number}>({number})</Text>
        </View>

      </View>
      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </Pressable>
  )
}

const styles = StyleSheet.create({

  container: {
    height: 120,
    width: 100,
    //backgroundColor: 'yellow',
    alignItems: 'center',
    marginRight: 10,
  },
  
  imgContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#eeeeee',
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

})