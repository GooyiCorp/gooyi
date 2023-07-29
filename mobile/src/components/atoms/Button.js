import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';



export const RedButton = ({ title, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.redButton, style]} onPress={onPress}>
            <Text style={styles.redTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

export const WhiteButton = ({ title, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.whiteButton, style]} onPress={onPress}>
            <Text style={styles.whiteTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

export const NavButton = ({ title, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.navButton, style]} onPress={onPress}>
            <Text style={styles.navTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    navButton: {
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        height: moderateScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginHorizontal: 5,
    },
    navTitle: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(11),
        textAlign: 'center',
    },
    redButton: {
        backgroundColor: '#B84058',
        paddingVertical: verticalScale(14),
        borderRadius: 30,
        marginTop: 20,
        width: moderateScale(200),
    },
    redTitle: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
        textAlign: 'center',
    },
    whiteButton: {
        backgroundColor: '#fff',
        paddingVertical: verticalScale(15),
        width: moderateScale(200),
        borderRadius: 30,
        marginTop: verticalScale(10),
    },
    whiteTitle: {
        color: '#000',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
        textAlign: 'center',
    }
})

