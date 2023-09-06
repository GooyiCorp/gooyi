import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height } from '../../constants/size'

export default function PresentationHeader({
    customContainerStyle,
    title,
    showAllButton
}) {
  return (
    <View style={[styles.containerStyle, customContainerStyle]}>
        <View style={styles.headerBar}>
            <Text style={styles.titleStyle}>{title}</Text>
            {showAllButton && <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonTitle}>Alle Anzeigen</Text>
                </TouchableOpacity>}
        </View>

    </View>
  )
}

const styles = StyleSheet.create({

    containerStyle: {
        width: '100%',
    },

    headerBar: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', 
        marginHorizontal: 30,
        marginBottom: 10,
    },

    titleStyle: {
        fontFamily: 'Roboto-Light',
        fontSize: 22,
        color: '#696969',
    },

    buttonStyle: {
        height: 30,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(184, 64, 88, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        color: '#B84058'
    }
})