import React, {useRef, useEffect, useState} from "react";
import { View, Text, SafeAreaView, FlatList, Animated } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import welcome from "../constants/welcome.js";
import Slider from "../components/molecules/Slider.js";
import { LinearGradient } from "expo-linear-gradient";

import PaginationBar from "../components/atoms/PaginationBar.js";

const AppIntroSlider = () => {

    const [showSignIn, setShowSignIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    
    const listRef = useRef(null)
    const scrollToEnd = () => {
        listRef.current.scrollToEnd({ animated: true });
    };
    // Animation ----------------------------------------------------------------
    const [slideIndex, setSlideIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const handleGetIndex = useRef(({viewableItems}) => {
        setSlideIndex(viewableItems[0].index)
    }).current
    const handleScroll = (event) => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX
                    }
                }
            }
        ],
            {
                useNativeDriver: false,
            },
        )(event);
    }
    // -------------------------------------------------------------------------
    
    return (
        <LinearGradient
            colors={['rgb(187,95,113)', 'rgba(211,128,145,1)', 'rgba(239,151,171,1)', 'rgba(229,150,167,1)', 'rgba(206,120,138,1)', 'rgba(182,87,107,1)']}
            locations={[0, 0.14, 0.24, 0.6, 0.74, 1]}
        >
            <FlatList 
                ref={listRef}
                data={welcome}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item, index }) => {
                    return (
                        <Slider item={item} index={index} scrollToEnd={scrollToEnd} scrollX={scrollX}/>
                    )
                }}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                onScroll={handleScroll}
                onViewableItemsChanged={handleGetIndex}
            />
            <PaginationBar scrollX={scrollX} currentIndex={slideIndex} /> 
        </LinearGradient>
    )
}

export default AppIntroSlider;