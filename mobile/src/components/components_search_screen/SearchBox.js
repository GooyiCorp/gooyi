import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setFeedList, setRemoveFilter, setResetFilter, setSearchString, setSelectedCategory } from '../../redux/slices/searchSlice'
// Reanimated
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
// Constants
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
// Helpers
import { moderateScale } from '../../helper/scale'
// Components
import RoundButton from '../components_universal/RoundButton'
import Icons, { icons } from '../components_universal/Icons'
import Keywords from './Keywords'
import SearchFeed from './SearchFeed'
import Filter from './Filter'
import Request from '../../helper/request'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function SearchBox({
    onPressGoBack,
    onPressShowFilterModal
}) {
    
// Redux
const dispatch = useDispatch()

// Value
const longitude = useSelector((state) => state.locate.long)
const latitude = useSelector((state) => state.locate.lat)

const categorySelected = useSelector((state) => state.search.category)
const selectedFilter = useSelector((state) => state.search.filter)
const selectedSortCategory = useSelector((state) => state.search.sortCategory)
const searchString = useSelector((state) => state.search.searchString)
const selectedCount = selectedFilter.length + (selectedSortCategory != '' ? 1: 0)
const feedList = useSelector((state) => state.search.feedList)

const [containerHeight, setContainerHeight] = useState(0)
const [showKeyWords, setShowKeywords] = useState(true)


    const keywordsList = [
        {id: 1, keyword: 'Snacks'},
        {id: 2, keyword: 'Bubble Tea'},
        {id: 3, keyword: 'Asiatisch'},
        {id: 4, keyword: 'Coffee'},
        {id: 5, keyword: 'Spa'},
        {id: 6, keyword: 'Indisch'},
        {id: 7, keyword: 'Sushi'},
        {id: 8, keyword: 'Chinesisch'},
        {id: 9, keyword: 'Pizza'},
    ]

    // const feedList = [
    //     {id: 1, shopName: 'Asia Hung - City Center', description: 'Asiatisch, Thai', distance: '1,5 km'},
    //     {id: 2, shopName: 'Momo Street Kitchen Borkum', description: 'Bowl, Smoothies', distance: '1,0 km'}
    // ]



// ----------------------------
// Handler Section
// ---------------------------- 
    // ---- handle Clear Button
    const handleClear = () => {
        dispatch(setSearchString(''))
        setShowKeywords(true)
        keywordsTransition.value = withTiming(0, {duration: 500})
        Keyboard.dismiss()
    }
    // ---- OnPress Keyword
    const handlePress = (row) => {
        dispatch(setSearchString(row.keyword))
        handleSearch()
    }
    // ---- handle Search
    const handleSearch = async () => {
        if (searchString) {
        keywordsTransition.value = withTiming(1, {duration: 500})
        setTimeout(() => {
            setShowKeywords(false)
        }, 500)
        const category = selectedFilter.map(item => item.filter)

        // Thanh - Search API ---------------------------------------------------------
        const response = await Request(`user/store/search?longitude=${longitude}&latitude=${latitude}&radius=10000&searchString=${searchString}&category=${category}&sort=${selectedSortCategory}`)
        dispatch(setFeedList(response.data))
        // ----------------------------------------------------------------------------

        }
    }

// ----------------------------  
// Animation Section
// ---------------------------- 
    // ---- Value
    const keywordsTransition = useSharedValue(0)
    const feedTransition = useSharedValue(0)

    // ---- Animated Style
        // Keywords Container Animation
        const translateKeywordsContainer = useAnimatedStyle(() => {
            return {
                opacity: interpolate(keywordsTransition.value, [0,0.3], [1,0]),
                transform: [
                    {translateY: interpolate(keywordsTransition.value, [0,1], [0, -containerHeight])}
                ]
            }
        })
        // Feed Animation
        const translateFeed = useAnimatedStyle(() => {
            return {
                opacity: feedTransition.value
            }
        })

    // ---- Animation Trigger
    useEffect(() => {
        if (!showKeyWords) {
            feedTransition.value = withTiming(1, {duration: 200})
        } else {
            feedTransition.value = withTiming(0)
        }
    }, [showKeyWords])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
    <View>
    <View style={styles.container}>
        <RoundButton 
            icon={icons.Ionicons}
            iconName={'md-chevron-back'}
            iconSize={moderateScale(28,0.2)}
            iconColor={COLORS.ivory}
            style={{
                backgroundColor: COLORS.grey,
                height: moderateScale(38,0.2),
                width: moderateScale(38,0.2),
                margin: 0,
            }}
            onPressButton={onPressGoBack}
        />
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Wonach möchtest du suchen?'
                placeholderTextColor={COLORS.grey}
                style={{
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 50,
                    fontFamily: 'RH-Regular',
                    fontSize: 15,
                }}
                returnKeyType='search'
                autoComplete='off'
                autoCorrect={false}
                keyboardAppearance='dark'


                value={searchString}
                // onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
                onChangeText={(e) => dispatch(setSearchString(e))}
                onSubmitEditing={handleSearch}
            />

            <View 
                style={[
                    styles.rightView,
                    {zIndex: searchString? 1 : 0}
                ]}
            >

                {/* Clear Button */}
                <RoundButton
                    icon={icons.Ionicons}
                    iconName={'close'}
                    iconSize={30}
                    iconColor={COLORS.subPrimary}
                    style={{
                        backgroundColor: 'transparent',
                        margin: 0,
                        marginRight: 5, 
                        opacity: searchString? 1 : 0, 
                        transform: [
                            {scaleX: searchString? 1 : 0}
                        ],
                    }}

                    // handle Clear
                    onPressButton={handleClear}
                />
            </View>
        </View>
            <RoundButton 
                badges={selectedCount != 0? true : false}
                count={selectedCount}
                icon={icons.FontAwesome}
                iconName={'sliders'}
                iconSize={26}
                iconColor={COLORS.grey}
                style={{
                    backgroundColor: 'transparent',
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    margin: 0,
                    zIndex: 1,
                }}
                onPressButton={onPressShowFilterModal}
            />
        
    </View>

        
    {/* -------------------------------------------------------- Search for Section */}
    <View style={{width: width, paddingHorizontal: 25}}>

    {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginBottom: 8, marginTop: 10, marginHorizontal: 10}]}>Suche in Kategorie</Text> */}
    
    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
    {/* {categoryList.map((category) => (
        <Filter 
            key={category.id} 
            keyword={category.category} 
            onPress={() => handleSelectCategory(category)}
            bgStyle={{
                backgroundColor: selectedCategory == category.id? COLORS.grey : 'transparent',
                borderColor: selectedCategory == category.id? COLORS.grey : COLORS.borderGrey
            }}
            textStyle={{
                color: selectedCategory == category.id? COLORS.mainBackground : COLORS.lightGrey,
            }}
        />
    ))} */}

    {/* <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginBottom: 8, marginTop: 10, marginHorizontal: 10}]}>Keywords</Text> */}
    {showKeyWords && <Animated.View style={[styles.keywordsContainer, translateKeywordsContainer]} onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
        <Filter 
            keyword={categorySelected}
            bgStyle={{
                backgroundColor: COLORS.grey,
                borderColor: COLORS.grey,
                borderRadius: 10,
            }}
            textStyle={{
                color: COLORS.mainBackground,
            }}
            onPress={onPressShowFilterModal}
        />
        {keywordsList.map((list) => (<Keywords key={list.id} keyword={list.keyword} onPress={() => handlePress(list)}/>))}
    </Animated.View>}

    </View>

        <View style={{flexDirection: 'row', marginHorizontal: 5}}>
            
            {/* Category */}
            {/* <View style={{width: '28%'}}>
                <Text style={[T3, {color: COLORS.grey, marginLeft: 5}]}>Suche in</Text>
                <SearchLabel label={categorySelected} onPress={() => dispatch(setShowFilterModal())}/>
            </View> */}

            {/* Filter */}
            {/* <View style={{width: '72%'}}>
                <Text style={[T3, {color: COLORS.grey, marginLeft: 5}]}>{filterSelected.length !== 0 ? 'Filter' : ''}</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {filterList.map((filter) => (<SearchLabel key={filter.id} label={filter.filter} onPress={() => dispatch(setRemoveFilter(filter))} style={{backgroundColor: COLORS.ivoryDark, color: COLORS.grey}}/>))}
                </View>
            </View> */}

        </View>


    </View>


    {!showKeyWords && 
    <Animated.View style={[{zIndex: 2, paddingHorizontal: 30}, translateFeed]}>
        
        {feedList.map((feed) => (<SearchFeed key={feed.store_id} shopName={feed.name} description={feed.category.slice(0,3)} distance={feed.distance}/>))}

    </Animated.View>
    
    }

    </View>
  )
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    container: {
        width: width-60,
        height: 50,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        // position: 'absolute',
        marginTop: 55,
        marginBottom: 15,
        // opacity: 0.5
        zIndex: 2
    },

    inputContainer: {
        width: width-60-48-43,
        marginLeft: 10,
        marginRight: 5,
        height: 46,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        justifyContent: 'center',
        // borderBottomWidth: 0.2,
        borderColor: COLORS.grey,
    },

    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        position: 'absolute',
        right: 0,
        zIndex: 2,
    },

    keywordsContainer: {
        width: width-50,
        // paddingHorizontal: 25,
        // justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 1,
    },
})