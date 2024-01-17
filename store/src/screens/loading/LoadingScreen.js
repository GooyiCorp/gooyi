import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Helpers
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LoadingScreen() {
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>
    <Text>LoadingScreen</Text>
</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.ivory,

        justifyContent: 'center',
        alignItems: 'center'
    },

})