import React, { useEffect, useRef, useState } from "react";
import { FlatList, Animated } from "react-native";


import welcome from "../constants/welcome.js";
import Slider from "../components/molecules/Slider.js";
import { LinearGradient } from "expo-linear-gradient";

import PaginationBar from "../components/atoms/PaginationBar.js";
import SignIn from "./SignIn.js";
import Register from "./Register.js";

import { RedButton } from "../components/atoms/Button.js";
import { verticalScale } from "react-native-size-matters";
import { width } from "../constants/size.js";
const AppIntroSlider = ( {setShowHomePage}) => {
    const timerId = useRef(null);
    const active = useRef(true);
    useEffect(() => {
        timerId.current = setTimeout(() => {
            active.current = false;
        }, 5000)
        const id = setInterval(() => {
            if (active.current == false && slideIndex.current != welcome.length - 1) {
                slideIndex.current += 1;
                listRef.current.scrollToIndex({ animated: true, index: slideIndex.current});
                handleActive();
            }
        }, 100)
        return () => clearInterval(id)
    }, []);
    function handleActive() {
        active.current = true;
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
            active.current = false;
        }, 5000);
        
    }
    // ----------------------------------------------------------------
    const [showSignIn, setShowSignIn] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const onCloseSignIn = () => {
        setTimeout(() => {
            setShowSignIn(false);
        }, 300)

    }
    const onCloseRegister = () => {
        setTimeout(() => {
            setShowRegister(false);
        }, 300)

    }
    // Animation ----------------------------------------------------------------
    const listRef = useRef(null)
    const scrollToEnd = () => {
        listRef.current.scrollToEnd({ animated: true });
    };
    const slideIndex = useRef(0)
    const scrollX = useRef(new Animated.Value(0)).current
    const handleGetIndex = useRef(({ viewableItems }) => {
        slideIndex.current = (viewableItems[0].index)
    }).current
    const handleScroll = (event) => {
        handleActive()
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
    const inputRange = [ 2* width, 3* width]
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })
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
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <Slider item={item} index={index} scrollToEnd={scrollToEnd} scrollX={scrollX} setShowSignIn={setShowSignIn} setShowRegister={setShowRegister} showRegister={showRegister}/>
                    )
                }}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                onScroll={handleScroll}
                onViewableItemsChanged={handleGetIndex}
            />
            { slideIndex != welcome.length -1 && 
            <Animated.View style={{opacity: opacity}}>
                <RedButton title="Los geht's" onPress={scrollToEnd} style={{position: 'absolute', bottom: verticalScale(70), alignSelf: 'center' }} />
            </Animated.View>
            }
            <PaginationBar scrollX={scrollX} currentIndex={slideIndex} />
            {showSignIn && <SignIn onClose={onCloseSignIn} homepage={setShowHomePage} />}
            {showRegister && <Register onClose={onCloseRegister} homepage={setShowHomePage}/>}
            {/* <Register /> */}

        </LinearGradient>
    )
}

export default AppIntroSlider;