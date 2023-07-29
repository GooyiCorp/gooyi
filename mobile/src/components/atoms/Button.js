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
export const GreyButton = ({ title, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.greyButton, style]} onPress={onPress}>
            <Text style={styles.greyTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    redButton: {
        backgroundColor: '#B84058',
        paddingVertical: verticalScale(15),
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
    },
    greyButton: {
        backgroundColor: '#f4f4f4',
        paddingVertical: verticalScale(15),
        width: moderateScale(200),
        borderRadius: 30,
        marginTop: verticalScale(10),
    },
    greyTitle: {
        color: '#000',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
        textAlign: 'center',
    }
})

