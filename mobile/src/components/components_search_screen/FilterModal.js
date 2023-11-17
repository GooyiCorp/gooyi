import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'

import { H3, H4 } from '../../constants/text-style'
import { setHideFilterModal } from '../../redux/slices/showModalSlice'
import Keywords from './Keywords'
import Filter from './Filter'


export default function FilterModal() {

    const categoryList = [
        {id: 1, category: 'Geschäfte'},
        {id: 2, category: 'Coupons'},
        {id: 3, category: 'Angebote'},
    ]

    const storeFilterList = [
        {id: 1, filter: 'alle'},
        {id: 2, filter: 'beliebt'},
        {id: 3, filter: 'favorit'},
        {id: 4, filter: 'geöffnet'},
    ]
  // Animation -----------------------------------------------------------------------------------------------------------

    const dispatch = useDispatch()

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showFilterModal = useSelector((state) => state.showModal.filterModal)

    // handle Close ---------------------------------------------------
    const handleOnEnd = () => {
        setTimeout(() => {
            dispatch(setHideFilterModal())
        }, 50) 
    }

    const handleClose = () => {
        dispatch(setHideFilterModal())
    } 

    // handle Gesture -------------------------------------------------
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, 0.05*height)
    })
    .onEnd(() => {
        if (translateY.value > 0.2*height) {
            translateY.value = withTiming(height, {duration: 600, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
            runOnJS(handleOnEnd)()
        }
        else {
            translateY.value = withTiming(0.05*height, {duration: 400,
              easing: Easing.bezier(0.49, 1.19, 0.79, 1.01)})
        }
    })

    // handle Animation ------------------------------------------------

      // position Update
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translateY.value }]
        }
      })

      // check status
      useEffect(()=>{
        if (showFilterModal) {
            translateY.value = withTiming(0.05*height, {duration: 500, easing: Easing.bezier(0.49, 1.19, 0.79, 1.01),})
        } else {
            translateY.value = withDelay(100, withTiming(height, {duration: 400}))
        }
      }, [showFilterModal])


    const [selectedCategory, setSelectedCategory] = useState(1)
    const handleSelectCategory = (row) => {
        setSelectedCategory(row.id)
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}
                    <RoundButton 
                    icon={icons.MaterialIcons}
                    iconName={'close'}
                    iconSize={moderateScale(22,0.2)}
                    iconColor={COLORS.white}
                    style={{
                        backgroundColor: COLORS.grey,
                        height: moderateScale(34,0.2),
                        width: moderateScale(34,0.2),
                        position: 'absolute',
                        margin: 0,
                        top: 25,
                        right: 25,
                        zIndex: 2
                    }}
                    onPressButton={handleClose}
                />

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={H3}>Suche nach</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>
                <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.grey, paddingHorizontal: 10, marginBottom: 5}]}>Kategorie</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {categoryList.map((category) => (
                        <Filter 
                            key={category.id} 
                            keyword={category.category} 
                            onPress={() => handleSelectCategory(category)}
                            bgStyle={{
                                backgroundColor: selectedCategory == category.id? COLORS.ivoryDark : COLORS.mainBackground
                            }}
                            textStyle={{
                                color: selectedCategory == category.id? COLORS.grey : COLORS.ivoryDark2
                            }}
                        />
                    ))}
                </View>

                <View style={styles.line2}></View>

                <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.grey, paddingHorizontal: 10, marginBottom: 5}]}>Filter</Text>
                
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {storeFilterList.map((filter) => (
                    <Filter
                        key={filter.id}
                        keyword={filter.filter}
                    />
                ))}
                </View>
            </View>

        </Animated.View>
    </GestureDetector>
    
  )
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 0.6*height,
        width: width,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: COLORS.white,
        bottom: 0,
        borderRadius: 20,

        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
    
        elevation: 7,
    },
  
    line:{
      width: 75,
      height: 4,
      backgroundColor: COLORS.default,
      alignSelf: 'center',
      marginTop: 15,
      borderRadius: 2
    },

    h3: {
        fontFamily: 'RH-Light',
        fontSize: 24,
      },
  
    topSectionContainer: {
      width: width,
      marginTop: 10,
      paddingHorizontal: 30,
      justifyContent: 'flex-end',
      backgroundColor: COLORS.white,
      paddingBottom: 20
    },
  
    midSectionContainer: {
      height: (0.44*height),
      width: width,
      paddingHorizontal: 25,
      overflow: 'hidden',
    // backgroundColor: 'yellow'
    },

    line2: {
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
        marginTop: 15,
        marginBottom: 25
      },
  
  
  })