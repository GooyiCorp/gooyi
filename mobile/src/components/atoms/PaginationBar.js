import React, { useState, useRef } from 'react';

import { StyleSheet, View , Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';




const PaginationBar = ({width}) => {
    let paginationStatus = {
        height: 6,
        backgroundColor: "#B84058",
        borderRadius: 5,
        opacity: 1,
    }
    return (
        <View style={styles.paginationBar}>
            <Animated.View style={[paginationStatus, { width: width }]}></Animated.View>
        </View>
    )
}

const styles= StyleSheet.create({
    paginationBar: {
        backgroundColor: 'rgba(216,216,216,0.5)',
        height: 6,
        width: '80%',
        position: 'absolute',
        bottom: verticalScale(50),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
})

export default PaginationBar