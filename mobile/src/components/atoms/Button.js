import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';



export const RedButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.redButton} onPress={onPress}>
            <Text style={styles.redTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

export const WhiteButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.whiteButton} onPress={onPress}>
            <Text style={styles.whiteTitle}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
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

