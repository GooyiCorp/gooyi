import React, { useState, useRef } from 'react';

import { StyleSheet, View, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../helper/scale.js';
import { width } from '../../constants/size';

import welcome from '../../constants/welcome';

const PaginationBar = ({scrollX}) => {
    
    return (
        <View style={styles.container} >
            {
                welcome.map((_, index) =>{
                    const inputRange = [(index-1)*width, index*width, (index+1)*width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12,30,12],
                        extrapolate: 'clamp'
                    })
                    const dotBackground = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#ccc','#B84058', '#ccc'],
                        extrapolate: 'clamp'
                    })
                    return <Animated.View key={index.toString()} style={[styles.dot, {width: dotWidth, backgroundColor: dotBackground}]}/>;
                })
            }
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: verticalScale(150),
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        marginHorizontal: 3
    },
})

export default PaginationBar