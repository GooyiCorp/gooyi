import React, { useState } from "react";
import { Image, Text, View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { width, height } from "../../constants/size.js";
import welcome from "../../constants/welcome.js";
import { RedButton, WhiteButton } from "../atoms/Button.js";

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
    if (index != welcome.length - 1) {
        return (
            <Animated.View style={[styles.container, opacity]}>
                <Image source={item.image} style={styles.image} resizeMode="contain"/>
                <Text style={styles.text}>{item.text}</Text>
            </Animated.View>
        )
    } else {
        return (
            <View style={[styles.container]}>
                <Image source={item.image} style={styles.image} resizeMode="contain"/>
                <Text style={styles.text}>{item.text}</Text>
                <RedButton title="Anmelden" onPress={handleSignIn} />
                <WhiteButton title="Registrieren" onPress={handleRegister}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    image: {
        maxWidth: "80%",
        flex: 0.6,
        // maxHeight: "30%",
        // overflow: "visible"
    },
    text: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: moderateScale(25),
        width: scale(250),
        marginVertical: verticalScale(10),
    }
})

export default Slider