import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Touchable, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
// Gesture Handler
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// Reanimated
import Animated, { Easing, Extrapolate, interpolate, runOnJS, set, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
// Constants
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H3, H4 } from '../../constants/text-style'
// Helpers
import { moderateScale } from '../../helper/scale'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setFeedList, setFilter, setRemoveFilter, setResetFilter, setResetSortCategory, setSortCategory } from '../../redux/slices/searchSlice'
import { setHideFilterModal, setShowLocateModal } from '../../redux/slices/showModalSlice'
// Components
import RoundButton from '../components_universal/RoundButton'
import { icons } from '../components_universal/Icons'
import Filter from './Filter'
import LocateButton from '../components_locate_screen/LocateButton'
import BigButton from '../components_LogIn/BigButton'
import Request from './../../helper/request';

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FilterModal({
    showCategorySelection,
}) {

// Redux
const dispatch = useDispatch()

// ----------------------------  
// Modal Setting 
// ---------------------------- 
    // ---- Value 
    const translateY = useSharedValue(height)
    const context = useSharedValue({y: 0})
    const showFilterModal = useSelector((state) => state.showModal.filterModal)
    const longitude = useSelector((state) => state.locate.long)
    const latitude = useSelector((state) => state.locate.lat)
    // ---- handle Close 
    const handleOnEnd = () => {
        setTimeout(() => {
            dispatch(setHideFilterModal())
        }, 50) 
    }

    const handleClose = () => {
        dispatch(setHideFilterModal())
    } 

    // ---- handle Gesture 
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

    // ---- handle Animation
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

    // ---- State
    const selectedCategory = useSelector((state) => state.search.category)
    const selectedFilter = useSelector((state) => state.search.filter)
    const selectedSortCategory = useSelector((state) => state.search.sortCategory)
    const searchString = useSelector((state) => state.search.searchString)
    
    // ---- Handler
        // handle Reset
        const handleReset = () => {
            dispatch(setResetFilter())
            dispatch(setResetSortCategory())
        }
        // handle open Locate Modal
        const handleLocateSearchScreen = () => {
            dispatch(setHideFilterModal())
            dispatch(setShowLocateModal())
        }
        // * Category Handler 
        const handleSelectCategory = (row) => {
            dispatch(setCategory(row.category))
            if (selectedCategory != row.category) {
                dispatch(setResetFilter())
                dispatch(setResetSortCategory())
            }
        }
        // * Filter Handler
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
        // * Sort By Handler
        const handleSelectSortCategory = (row) => {
            if (row.sortCategory == selectedSortCategory) dispatch(setResetSortCategory())
            else dispatch(setSortCategory(row.sortCategory))
        }
        // Handle Search
        const handleSearch = async () => {
            // Lam search store truoc
            if (selectedCategory === 'Geschäfte') {
                const category = selectedFilter.map(item => item.filter)
                const response = await Request(`user/store/search?longitude=${longitude}&latitude=${latitude}&radius=10000&searchString=${searchString}&category=${category}&sort=${selectedSortCategory}`)
                dispatch(setFeedList(response.data))
            }
        }
// ----------------------------  
// List Section 
// ----------------------------

// Category List
const categoryList = [
    {category: 'Angebote'}, {category: 'Coupons'}, {category: 'Geschäfte'},
]
// Filter List
const filterList = selectedCategory == 'Angebote'? [
    {id: 1, filter: 'Coffee'},
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
    {id: 13, filter: 'Pommes'},
    {id: 14, filter: 'Amerikanisch'},
] : selectedCategory == 'Coupons'? [
    {id: 1, filter: 'Coffee'},
    {id: 2, filter: 'Sushi'},
    {id: 3, filter: 'Asiatisch'},
    {id: 4, filter: 'Indisch'},
    {id: 5, filter: 'Pizza'},
    {id: 6, filter: 'Steak'},
    {id: 7, filter: 'Snacks'},
    {id: 8, filter: 'Spa'},
] : [
    {id: 1, filter: 'Coffee'},
    {id: 2, filter: 'Sushi'},
    {id: 3, filter: 'Asiatisch'},
    {id: 4, filter: 'Indisch'},
    {id: 5, filter: 'Pizza'},
]
// Sort By List
const sortByList = selectedCategory == 'Angebote'? [
    {sortCategory: 'Neuerscheinung'},
    {sortCategory: 'Entfernung'},
    {sortCategory: 'Rabatt'},
] : selectedCategory == 'Coupons'? [
    {sortCategory: 'Gültigkeit'},
    {sortCategory: 'Neu'},
] : [
    {sortCategory: 'Geöffnet'},
    {sortCategory: 'Entfernung'},
    {sortCategory: 'Neu'},
    {sortCategory: 'Beliebtheit'},
]

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
// Gesture Handler
<GestureDetector gesture={gesture}>
            
    {/* Modal Container */}
    <Animated.View style={[styles.modalContainer, animatedStyle]}>

    {/* Line */}
    <View style={styles.line}></View>

    {/* ---- start Button Container */}
    <View style={{width: width, marginTop: 6, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center'}}>
        {/* Left View */}
            {/* Locate Button */}
            <LocateButton small onPressSmall={handleLocateSearchScreen}/>
        {/* Right View */}
        <View style={{flexDirection: 'row'}}>
            {/* Reset Button */}
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
            {/* Exit Button */}
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
    {/* ---- end Button Container */}
    
    {/* Header */}
    <View style={styles.topSectionContainer}>
        <Text style={[H4, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Sucheinstellungen</Text>
    </View>

    {/* ---- start mid Section */}
    <View style={styles.midSectionContainer}>

        {/* ------------------------------------------------ */}
        {/* Category */}
        {/* ------------------------------------------------ */}
        {showCategorySelection && 
            <>
                {/* Title */}
                <Text style={[H4, styles.subTitle]}>Kategorie</Text>
                {/* Selector */}
                <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: -5}}>
                    {categoryList.map((category, index) => (
                        <Filter 
                            key={index} 
                            keyword={category.category} 
                            onPress={() => handleSelectCategory(category)}
                            bgStyle={{
                                backgroundColor: selectedCategory == category.category? COLORS.grey : 'transparent',
                                borderColor: selectedCategory == category.category? COLORS.grey : COLORS.borderGrey,
                                borderRadius: 10,
                            }}
                            textStyle={{
                                color: selectedCategory == category.category? COLORS.white : COLORS.lightGrey,
                            }}
                        />
                    ))}
                </View>
            </>
        }

        {/* ------------------------------------------------ */}
        {/* Filter */}
        {/* ------------------------------------------------ */}
        {/* Title */}
        <Text style={[H4, styles.subTitle]}>Filter</Text>
        {/* Selector */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{overflow: 'visible'}}
            >
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: -5, width: width*2}} >
                {filterList.map((filter) => (
                    <Filter
                        key={filter.id}
                        keyword={filter.filter}
                        onPress={() => handleSelectFilter(filter)}
                        bgStyle={{
                            backgroundColor: checkFilter(filter) ?  COLORS.ivoryDark : 'transparent',
                            borderColor: checkFilter(filter) ?  COLORS.ivoryDark : COLORS.borderGrey,
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
        <Text style={[H4, styles.subTitle]}>Sortieren nach</Text>
        {/* Selector */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{overflow: 'visible'}}
            >
            <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: -5}}>
                {sortByList.map((sortList, index) => (
                    <Filter 
                        key={index} 
                        keyword={sortList.sortCategory} 
                        onPress={() => handleSelectSortCategory(sortList)}
                        bgStyle={{
                            backgroundColor: selectedSortCategory == sortList.sortCategory? COLORS.ivoryDark : 'transparent',
                            borderColor: selectedSortCategory == sortList.sortCategory? COLORS.ivoryDark : COLORS.borderGrey
                        }}
                        textStyle={{
                            color: selectedSortCategory == sortList.sortCategory? COLORS.grey : COLORS.lightGrey,
                        }}
                    />
                ))}
            </View>
            </ScrollView>

    </View>
    {/* ---- end Mid Section */}
    
    {/* Apply Button */}
    <BigButton 
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
        onPress={handleSearch}
    />

    </Animated.View>
</GestureDetector>
)

}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    modalContainer: {
        height: 0.65*height,
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

    topSectionContainer: {
        width: width,
        marginTop: 10,
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.white,
        paddingBottom: 10
    },
  
    midSectionContainer: {
        width: width,
        paddingLeft: 25,
        overflow: 'hidden',
    },

    subTitle: {
        fontFamily: 'RH-Regular', 
        color: COLORS.grey, 
        paddingHorizontal: 5, 
        marginBottom: 5,
        marginTop: 10
    },
  
})