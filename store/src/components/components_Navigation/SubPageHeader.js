import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import IconButton from '../universal/Buttons/IconButton'
import { icons } from '../universal/Icons/Icons'
import { COLORS } from '../../helper/constants/colors'

export default function SubPageHeader({
    onPressGoBack
}) {
  return (
    <View style={styles.container}>
        <View style={styles.leftView}>
            <IconButton 
                icon={icons.MaterialCommunityIcons}
                iconName={'arrow-left'}
                iconSize={33}
                iconColor={COLORS.grey}
                styleIcon={{left: -5}}
                styleContainer={{ alignItems: 'flex-start', height: 40, width: 40, borderRadius: 12, backgroundColor: 'transparent'}}
                onPress={onPressGoBack}
            />
        </View>
        <View style={styles.rightView}>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: width,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 30
        // alignItems: 'flex-start'
    },
    leftView: {
        height: 40,
        justifyContent: 'center'
    },
    rightView: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
})