import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HeaderNavigation(props) {
  return (
    <View style={styles.headerContainer}>
        <View style={{height: 80, width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>

            {/* Header Title */}
            <View style={styles.headerTitle}>
                <Text style={{fontFamily: 'Roboto-Medium', fontSize: 28, fontWeight: 'bold'}}>
                    Test
                </Text>
            </View>
            
            {/* Header Right */}
            <View style={styles.headerRight}>

            </View>

        </View>

            {/* Header Left */}
            <View style={styles.headerLeft}>
                <Text>Test</Text>
            </View>

    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 160,
        width: '100%',
        backgroundColor: 'red',
        paddingHorizontal: 30,
    },

    headerTitle: {
        height: 80,
        width: '70%',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        backgroundColor: 'yellow',
    },

    headerRight: {
        height: 80,
        width: '30%',
        backgroundColor: 'green',
    },

    headerLeft: {
        height: 50,
        width: '100%',
        backgroundColor: 'blue',
    },
})