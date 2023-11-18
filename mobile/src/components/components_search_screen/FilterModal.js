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
import { setCategory, setFilter, setRemoveFilter, setResetFilter, setSelectedCategory } from '../../redux/slices/searchSlice'


export default function FilterModal() {

    const dispatch = useDispatch()

// ----------------------------  
// Modal Setting 
// ---------------------------- 

    // Animation -----------------------------------------------------------------------------------------------------------
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

// ----------------------------  
// Selection Setting 
// ----------------------------

    // Value -----------------------------------------------------------
    const selectedCategory = useSelector((state) => state.search.selectedCategory)
    const [selectedFilter, setSelectedFilter] = useState(new Set([]))

    const test = useSelector((state) => state.search.filter)

    // Category Handle ------------------------------------------------
    const handleSelectCategory = (row) => {
        dispatch(setSelectedCategory(row.id))
        dispatch(setCategory(row.category))
        if (selectedCategory != row.id) {
            setSelectedFilter(new Set([]))
            dispatch(setResetFilter())
        }
    }

    // Filter Handle ------------------------------------------------
    const handleSelectFilter = (row) => {
        if (!selectedFilter.has(row.id)) {
            setSelectedFilter(prev => new Set(prev.add(row.id)))
            dispatch(setFilter(row.filter))
        } else {
            setSelectedFilter(prev => new Set([...prev].filter(x => x !== row.id)))
            dispatch(setRemoveFilter(row.filter))
            
        }
    }

    console.log(test)
    
    // List ------------------------------------------------------------
    // Category List
    const categoryList = [
        {id: 1, category: 'Geschäfte'},
        {id: 2, category: 'Coupons'},
        {id: 3, category: 'Angebote'},
    ]

    // Filter List
    let filterList = []
    if (selectedCategory == 1) {
        filterList = [
            {id: 1, filter: 'neu'},
            {id: 2, filter: 'beliebt'},
            {id: 3, filter: 'favorit'},
            {id: 4, filter: 'geöffnet'},
            {id: 5, filter: 'kartenzahlung'},
        ]
    } else if (selectedCategory == 2) {
        filterList = [
            {id: 1, filter: 'neu'},
            {id: 2, filter: 'kurze Gültigkeit'},
            {id: 3, filter: 'im Besitz'},
        ]
    } else {
        filterList = [
            {id: 1, filter: 'neu'},
            {id: 2, filter: 'hot'},
        ]
    }


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}

            <View style={{position: 'absolute', top: 25,right: 25, zIndex: 2, flexDirection: 'row'}}>

                <RoundButton 
                    icon={icons.MaterialIcons}
                    iconName={'undo'}
                    iconSize={22}
                    iconColor={COLORS.grey}
                    style={{
                        backgroundColor: COLORS.ivoryDark,
                        height: moderateScale(34,0.2),
                        width: moderateScale(34,0.2),
                        margin: 0,
                        marginRight: 10, 
                        borderRadius: 8,
                    }}
                />

                <RoundButton 
                    icon={icons.MaterialIcons}
                    iconName={'close'}
                    iconSize={moderateScale(22,0.2)}
                    iconColor={COLORS.white}
                    style={{
                        backgroundColor: COLORS.grey,
                        height: moderateScale(34,0.2),
                        width: moderateScale(34,0.2),
                        margin: 0,
                    }}
                    onPressButton={handleClose}
                />


            </View>

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={H3}>Suche nach</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>

                {/* Search by Category */}
                <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5}]}>Kategorie</Text>

                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>

                    {categoryList.map((category) => (
                        <Filter 
                            key={category.id} 
                            keyword={category.category} 
                            onPress={() => handleSelectCategory(category)}
                            bgStyle={{
                                backgroundColor: selectedCategory == category.id? COLORS.ivoryDark : 'transparent',
                                borderColor: selectedCategory == category.id? COLORS.ivoryDark : COLORS.borderGrey
                            }}
                            textStyle={{
                                color: selectedCategory == category.id? COLORS.grey : COLORS.lightGrey,
                            }}
                        />
                    ))}

                </View>

                <View style={styles.line2}></View>

                {/* Search Filter */}
                <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5}]}>Filter</Text>
                
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>

                    {filterList.map((filter) => (
                        <Filter
                            key={filter.id}
                            keyword={filter.filter}
                            onPress={() => handleSelectFilter(filter)}
                            bgStyle={{
                                backgroundColor: selectedFilter.has(filter.id) ?  COLORS.ivoryDark : 'transparent',
                                borderColor: selectedFilter.has(filter.id) ?  COLORS.ivoryDark : COLORS.borderGrey
                            }}
                            textStyle={{
                                color: selectedFilter.has(filter.id) ? COLORS.grey : COLORS.lightGrey,
                            }}
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
        zIndex: 5,
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
        marginBottom: 15
      },
  
  
  })