import React, { useState } from "react";
import { Image, Text, View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { scale, verticalScale, moderateScale } from '../../helper/scale.js';

import { width, height } from "../../constants/size.js";
import welcome from "../../constants/welcome.js";
import { RedButton, WhiteButton } from "../atoms/Button.js";
import { COLORS } from "../../index/constantsindex.js";

const Slider = ({ item, index, scrollX, setShowSignIn, setShowRegister }) => {
    
    const handleSignIn = () => {
        setShowSignIn(true)
    }
    const handleRegister = () => {
        setShowRegister(true)
    }

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
    const opacity = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0.2, 1, 0.2],
        extrapolate: 'clamp'
    })
    // if (index != welcome.length - 1) {
        return (
            <Animated.View style={[styles.container]}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} resizeMode="contain"/>
                </View>
                <Text style={styles.text}>{item.text}</Text>
            </Animated.View>
        )
    // } 
    // else {
    //     return (
    //         <View style={[styles.container]}>
    //             <Image source={item.image} style={styles.image} resizeMode="contain"/>
    //             <Text style={styles.text}>{item.text}</Text>
    //             <RedButton title="Anmelden" onPress={handleSignIn} />
    //             <WhiteButton title="Registrieren" onPress={handleRegister}/>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        flex: 1,
        backgroundColor: COLORS.primary
    },
    // justifyContent: 
    image: {
        maxWidth: "100%",
    },
    text: {
        fontFamily: 'RH-Black', 
        fontSize: moderateScale(30,0.2),  
        textAlign: 'center',
        color: COLORS.white
    },

    imageContainer: {
        height: 500,
        width: width-60,
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '30%'
    }
})

export default Slider