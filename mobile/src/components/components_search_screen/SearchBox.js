import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import { height, width } from '../../constants/size'
import RoundButton from '../components_universal/RoundButton'
import Icons, { icons } from '../components_universal/Icons'
import { moderateScale } from '../../helper/scale'
import Keywords from './Keywords'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import SearchFeed from './SearchFeed'
import { T2, T3 } from '../../constants/text-style'
import { useDispatch, useSelector } from 'react-redux'
import { setShowFilterModal } from '../../redux/slices/showModalSlice'
import SearchLabel from './SearchLabel'
import { setRemoveFilter } from '../../redux/slices/searchSlice'

export default function SearchBox({
    onPressGoBack
}) {

    const keywordsList = [
        {id: 1, keyword: 'Snacks'},
        {id: 2, keyword: 'Bubble Tea'},
        {id: 3, keyword: 'Asiatisch'},
        {id: 4, keyword: 'Coffee'},
        {id: 5, keyword: 'Spa'},
        {id: 6, keyword: 'Angebote'},
        {id: 7, keyword: 'Sushi'},
        {id: 8, keyword: 'Chinesisch'},
        {id: 9, keyword: 'Neu'},
    ]

    const feedList = [
        {id: 1, shopName: 'Asia Hung - City Center', description: 'Asiatisch, Thai', distance: '1,5 km'},
        {id: 2, shopName: 'Momo Street Kitchen Borkum', description: 'Bowl, Smoothies', distance: '1,0 km'}
    ]

    const filterList = useSelector((state) => state.search.filter)  
    const dispatch = useDispatch()

    // --------------------------------------- Value
    const categorySelected = useSelector((state) => state.search.category)
    const filterSelected = useSelector((state) => state.search.filter)

    const [data, setData] = useState('')
    // const [focus, setFocus] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    const [showKeyWords, setShowKeywords] = useState(true)

    // --------------------------------------- handle Clear Button
    const handleClear = () => {
        setData('')
        setShowKeywords(true)
        keywordsTransition.value = withTiming(0, {duration: 500})
        Keyboard.dismiss()
    }

    // --------------------------------------- OnPress Keyword
    const handlePress = (row) => {
        setData(row.keyword)
        handleSearch(row.keyword)
    }

    // --------------------------------------- handle Search
    const handleSearch = (input) => {
        if (input) {
        keywordsTransition.value = withTiming(1, {duration: 500})
        setTimeout(() => {
            setShowKeywords(false)
        }, 500)
        console.log('search:', input)

        // Thanh - Search API ---------------------------------------------------------



        // ----------------------------------------------------------------------------

        }
    }

    // --------------------------------------- Animation
    const keywordsTransition = useSharedValue(0)
    const feedTransition = useSharedValue(0)

    const translateKeywordsContainer = useAnimatedStyle(() => {
        return {
            opacity: interpolate(keywordsTransition.value, [0,0.3], [1,0]),
            transform: [
                {translateY: interpolate(keywordsTransition.value, [0,1], [0, -containerHeight])}
            ]
        }
    })

    const translateFeed = useAnimatedStyle(() => {
        return {
            opacity: feedTransition.value
        }
    })

    useEffect(() => {
        if (!showKeyWords) {
            feedTransition.value = withTiming(1, {duration: 200})
        } else {
            feedTransition.value = withTiming(0)
        }
    }, [showKeyWords])

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
                marginRight: 10
            }}
            onPressButton={onPressGoBack}
        />
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Wonach möchtest du suchen?'
                placeholderTextColor={COLORS.grey}
                style={{
                    flex: 1,
                    paddingLeft: 20,
                    paddingRight: 50,
                    fontFamily: 'RH-Regular',
                    fontSize: 15,
                }}
                returnKeyType='search'
                autoComplete='off'
                autoCorrect={false}
                keyboardAppearance='dark'


                value={data}
                // onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
                onChangeText={(e) => setData(e)}
                onSubmitEditing={() => handleSearch(data)}
            />

            <View 
                style={[
                    styles.rightView,
                    {zIndex: data? 1 : 0}
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
                        opacity: data? 1 : 0, 
                        transform: [
                            {scaleX: data? 1 : 0}
                        ],
                    }}

                    // handle Clear
                    onPressButton={handleClear}
                />
            </View>
        </View>
        
    </View>

    {/* -------------------------------------------------------- Search for Section */}
    <View style={{marginBottom: 15, marginHorizontal: 25}}>

        <View style={{flexDirection: 'row', marginHorizontal: 5}}>

            {/* Category */}
            <View style={{width: '28%'}}>
                <Text style={[T3, {color: COLORS.grey, marginLeft: 5}]}>Suche in</Text>
                <SearchLabel label={categorySelected} onPress={() => dispatch(setShowFilterModal())}/>
            </View>

            {/* Filter */}
            <View style={{width: '72%'}}>
                <Text style={[T3, {color: COLORS.grey, marginLeft: 5}]}>{filterSelected.length !== 0 ? 'Filter' : ''}</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {filterList.map((filter) => (<SearchLabel key={filter.id} label={filter.filter} onPress={() => dispatch(setRemoveFilter(filter))} style={{backgroundColor: COLORS.ivoryDark, color: COLORS.grey}}/>))}
                </View>
            </View>

        </View>


    </View>

    {showKeyWords && <Animated.View style={[styles.keywordsContainer, translateKeywordsContainer]} onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
        {keywordsList.map((list) => (<Keywords key={list.id} keyword={list.keyword} onPress={() => handlePress(list)}/>))}
    </Animated.View>}

    {!showKeyWords && 
    <Animated.View style={[{zIndex: 2, paddingHorizontal: 30}, translateFeed]}>
        
        {feedList.map((feed) => (<SearchFeed key={feed.id} shopName={feed.shopName} description={feed.description} distance={feed.distance}/>))}

    </Animated.View>
    
    }

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 50,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        // position: 'absolute',
        marginTop: 55,
        marginBottom: 15,
        // opacity: 0.5
        zIndex: 2
    },

    inputContainer: {
        width: width-60-48,
        height: 50,
        backgroundColor: COLORS.mainBackground,
        borderRadius: 50,
        justifyContent: 'center',
        borderWidth: 0.5,
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
        width: width,
        paddingHorizontal: 25,
        // justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 1,
    },
})