import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { measure, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, runOnUI, interpolate } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Icons, {icons} from '../../components_universal/Icons'
import { useNavigation } from '@react-navigation/native'

// ---------------------------------------------------------------------------------------------------------------------
export default function Accordion({value}) {
    const navigation = useNavigation()
    const navigate = (routeName) => routeName !== '' ? navigation.navigate(routeName) : null;

    // Value --------------------------------------------------------------- Transition
    const open = useSharedValue();
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const transitionVal = useSharedValue(0)

    // UseDerivedValue ---------------------------------------------------- Transition
    const progress = useDerivedValue(() => 
        open.value ? withTiming(1) : withTiming(0),
    )

    // UseAnimatedStyle ---------------------------------------------------- Transition
    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    const chevronStyle = useAnimatedStyle(() => ({
        transform: [
            {rotate: `${progress.value * -180}deg`},
        ],
    }));

    const boxTransition = useAnimatedStyle(() => ({
        opacity: interpolate(transitionVal.value, [0,1], [1, 0.5])
    }))

// ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.accordion}>

        {/* Accordion Head ------------------------------------------------------------- */}
        <Pressable
            style={styles.titleContainer}
            onPress={() => {
                if (heightValue.value === 0) {
                    runOnUI(() => {
                      'worklet';
                      heightValue.value = withTiming(measure(listRef).height);
                    })();
                  } else {
                    heightValue.value = withTiming(0);
                  }
                open.value = !open.value;
            }}
            onPressIn={ () => ( value.showShevron == false?
                transitionVal.value = withTiming(1, {duration: 100}): transitionVal.value = 0
              ) } 
              onPressOut={ () => ( value.showShevron == false?
                transitionVal.value = withTiming(0, {duration: 100}): transitionVal.value = 0
              ) }
        >

            {/* ------------------------------------------------------------- */}

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <Icons icon={value.type} iconName={value.ico} iconColor='#b0b0b0' iconSize={value.size}/>
                    </View>

                    {/* Title */}
                    <Animated.Text style={[styles.titleStyle, boxTransition]}>{value.title}</Animated.Text>

                </View>

                {/* Chevron */}
                {value.showShevron == true? 
                <Animated.View style={chevronStyle}>
                    <Ionicons name='chevron-down' size={20} color="#b0b0b0" />
                </Animated.View> : <View></View>}

            {/* ------------------------------------------------------------- */}

        </Pressable>

        {/* Accordion Body -------------------------------------------------------------- */}
        <Animated.View style={value.showShevron == true ? heightAnimationStyle: {}}>
            <Animated.View style={styles.contentContainer} ref={listRef}>

                {value.content.map((v, i) => {
                    return (
                        <TouchableOpacity key={i} style={styles.content} onPress={() => {
                            navigate(v.routeName)
                        }}>
                            <Text>{v.routeTitle}</Text>
                        </TouchableOpacity>
                    )
                })}

            </Animated.View>
        </Animated.View>

    </View>

  )
}

const styles = StyleSheet.create({
    accordion: {
        width: 363,
        //backgroundColor: 'lightgrey',
        marginBottom: 5,
        //borderRadius: 16,
        borderBottomWidth: 0.5,
        borderColor: '#eeeeee',
        overflow: 'hidden',
    },

    titleContainer: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 

    titleStyle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        marginLeft: 20
    },

    contentContainer: {
        width: '100%',
        paddingBottom: 10,
        //backgroundColor: 'yellow',
        position: 'absolute'
    },

    content: {
        paddingLeft: 65,
        paddingVertical: 10,
    },

    iconContainer: {
        height: 45,
        width: 45,
        //backgroundColor: '#eeeeee',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})