import { StyleSheet, Text, View, Button } from 'react-native'
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
  const startPosition = (diagonal/2)+50
  const endPosition = -(diagonal/2)-50

  const flashValue = useSharedValue(0)

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

// ---------------------------------------------------------------------------------------------------------------------

  return (
    <TouchableOpacity onPressIn={ () => ( flashValue.value = withTiming( 1, {duration: 400}) ) } onPressOut={ () => (flashValue.value = withTiming(2, {duration: 400}, (finished) => (flashValue.value = 0)) ) }>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <View style={styles.container}>

        <View style={styles.imgContainer}>
          <Animated.View style={[ { height: diagonal, width: diagonal, backgroundColor: '#fff', position: 'absolute', opacity: 0.3, zIndex: 1, }, flashOverlay ]}></Animated.View>
        </View>


        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.number}>({number})</Text>
        </View>

      </View>
      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    </TouchableOpacity>
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
    backgroundColor: 'grey',
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