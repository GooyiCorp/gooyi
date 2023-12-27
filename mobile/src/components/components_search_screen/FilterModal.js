import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { Easing, Extrapolate, interpolate, runOnJS, set, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import RoundButton from '../components_universal/RoundButton'
import { moderateScale } from '../../helper/scale'
import { icons } from '../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'

import { H3, H4 } from '../../constants/text-style'
import { setHideFilterModal, setShowLocateModal } from '../../redux/slices/showModalSlice'
import Keywords from './Keywords'
import Filter from './Filter'
import { setCategory, setFilter, setFilterModalIndex, setRemoveFilter, setResetFilter, setResetSortCategory, setSelectedCategory, setSortCategory } from '../../redux/slices/searchSlice'
import SubHeader from '../components_navigation/SubHeader'
import LocateButton from '../components_locate_screen/LocateButton'
import BigButton from '../components_LogIn/BigButton'


export default function FilterModal() {

// Redux
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

    // :::::::::::::::::::::::::: State
    const selectedCategory = useSelector((state) => state.search.selectedCategory)
    const selectedFilter = useSelector((state) => state.search.filter)
    const selectedSortCategory = useSelector((state) => state.search.sortCategory)

    const selected = selectedFilter.length + (selectedSortCategory != '' ? 1: 0)
    
    // :::::::::::::::::::::::::: Handle
    // Category Handle
    const handleSelectCategory = (row) => {
        dispatch(setSelectedCategory(row.id))
        dispatch(setCategory(row.category))
        if (selectedCategory != row.id) {
            dispatch(setResetFilter())
            dispatch(setResetSortCategory())
        }
    }

    // Filter Handle
    const checkFilter = (row) => {
        for (const [i, value] of selectedFilter.entries()) {
            if (row.id == value.id) {
                return true
            }
        }
        return false
    } 
    const handleSelectFilter = (row) => {
        if (checkFilter(row)) dispatch(setRemoveFilter(row))
        else dispatch(setFilter(row))
    }

    // Sort By Handle
    const handleSelectSortCategory = (row) => {
        if(row.id == selectedSortCategory.id) dispatch(setResetSortCategory())
        else dispatch(setSortCategory(row))
    }

    // handle Reset
    const handleReset = () => {
        dispatch(setResetFilter())
        dispatch(setResetSortCategory())
    }

    // :::::::::::::::::::::::::: List
    // Category List
    const categoryList = [
        {id: 1, category: 'Geschäfte'},
        {id: 2, category: 'Coupons'},
        {id: 3, category: 'Angebote'},
    ]

    // Filter List
    // let filterList = []
    // if (selectedCategory == 1) {
    const filterList = [
            {id: 1, filter: 'Kaffee'},
            {id: 2, filter: 'Sushi'},
            {id: 3, filter: 'Asiatisch'},
            {id: 4, filter: 'Indisch'},
            {id: 5, filter: 'Pizza'},
            {id: 6, filter: 'Steak'},
            {id: 7, filter: 'Snacks'},
            {id: 8, filter: 'Spa'},
            {id: 9, filter: 'Chinesich'},
            {id: 10, filter: 'Eiscreme'},
            {id: 11, filter: 'Halal'},
            {id: 12, filter: 'Orientalisch'},
        ]

    // } else if (selectedCategory == 2) {
    //     filterList = [
    //         {id: 1, filter: 'neu'},
    //         {id: 2, filter: 'kurze Gültigkeit'},
    //         {id: 3, filter: 'im Besitz'},
    //     ]
    // } else {
    //     filterList = [
    //         {id: 1, filter: 'neu'},
    //         {id: 2, filter: 'hot'},
    //     ]
    // }

    // Sort By List
    const sortByList = [
        {id: 1, sortCategory: 'Geöffnet'},
        {id: 2, sortCategory: 'Entfernung'},
        {id: 3, sortCategory: 'Neuerscheinung'},
    ]

    const handleLocateSearchScreen = () => {
        dispatch(setHideFilterModal())
        dispatch(setShowLocateModal())
    }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
            
            {/* Modal Container ---------------------------------------------------- */}
            <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>

            {/* -------------------------------------------------------------------- Close Button */}
            <View style={{width: width, marginTop: 6, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center'}}>
                <LocateButton small onPressSmall={handleLocateSearchScreen}/>
                <View style={{flexDirection: 'row'}}>
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
                        onPressButton={handleReset}
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
            </View>
            

            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                    <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Sucheinstellungen</Text>
            </View>

            {/* -------------------------------------------------------------------- Mid Section */}
            <View style={styles.midSectionContainer}>

                {/* ------------------------------------------------ */}
                {/* Category */}
                {/* ------------------------------------------------ */}
                {/* Title */}
                <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5}]}>Kategorie</Text>
                {/* Selector */}
                <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: -5}}>
                    {categoryList.map((category) => (
                        <Filter 
                            key={category.id} 
                            keyword={category.category} 
                            onPress={() => handleSelectCategory(category)}
                            bgStyle={{
                                backgroundColor: selectedCategory == category.id? COLORS.grey : 'transparent',
                                borderColor: selectedCategory == category.id? COLORS.grey : COLORS.borderGrey,
                                borderRadius: 10,
                            }}
                            textStyle={{
                                color: selectedCategory == category.id? COLORS.white : COLORS.lightGrey,
                            }}
                        />
                    ))}
                </View>

                {/* ------------------------------------------------ */}
                {/* Filter */}
                {/* ------------------------------------------------ */}
                {/* Title */}
                <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5, marginTop: 10}]}>Filter</Text>
                {/* Selector */}
                {/* <FlatList 
                    data={filterList}
                    renderItem={({item}) => <Filter keyword={item.filter}/>}
                    keyExtractor={(filter) => filter.id}
                /> */}
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{flexWrap: 'wrap', flexDirection: 'row', marginLeft: -5, width: width*2}}>
                            {filterList.map((filter) => (
                                <Filter
                                    key={filter.id}
                                    keyword={filter.filter}
                                    onPress={() => handleSelectFilter(filter)}
                                    bgStyle={{
                                        backgroundColor: checkFilter(filter) ?  COLORS.ivoryDark : 'transparent',
                                        borderColor: checkFilter(filter) ?  COLORS.ivoryDark : COLORS.borderGrey
                                    }}
                                    textStyle={{
                                        color: checkFilter(filter) ? COLORS.grey : COLORS.lightGrey,
                                    }}
                                />
                            ))}
                        </View>
                    </ScrollView>

                {/* ------------------------------------------------ */}
                {/* Sort by */}
                {/* ------------------------------------------------ */}
                {/* Title */}
                <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, paddingHorizontal: 5, marginBottom: 5, marginTop: 10}]}>Sortieren nach</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: -5}}>
                    {sortByList.map((sortList) => (
                        <Filter 
                            key={sortList.id} 
                            keyword={sortList.sortCategory} 
                            onPress={() => handleSelectSortCategory(sortList)}
                            bgStyle={{
                                backgroundColor: selectedSortCategory.id == sortList.id? COLORS.ivoryDark : 'transparent',
                                borderColor: selectedSortCategory.id == sortList.id? COLORS.ivoryDark : COLORS.borderGrey
                            }}
                            textStyle={{
                                color: selectedSortCategory.id == sortList.id? COLORS.grey : COLORS.lightGrey,
                            }}
                        />
                    ))}
                </View>
            </View>
        
        {/* <BigButton 
            title={'Anwenden'}
            bgStyle={{
                backgroundColor: COLORS.primary,
                position: 'absolute',
                zIndex: 2,
                bottom: 30+(0.05*height),
            }}
            titleStyle={{
                color: COLORS.white
            }}
        /> */}
        
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
    //   height: (0.44*height),
      width: width,
      paddingLeft: 25,
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