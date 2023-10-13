import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { MainHeader, SubHeader } from '../../../index/navIndex'
import { COLORS } from '../../../index/constantsindex'

export default function StoreEntry() {
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
        <View style={styles.headerImgContainer}></View>

        <View style={styles.contentSection}>
            <Text>StoreEntry</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headerImgContainer: {
        height: 0.35*height,
        width: width,
        backgroundColor: COLORS.subPrimary08,
    },

    contentSection: {
        height: height-(0.3*height),
        width: width,
        padding: 30,
    }
})