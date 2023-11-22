import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import { T2 } from '../../constants/text-style'

export default function StoreInfo({
    icon,
    iconName,
    iconSize,
    iconColor,
    text,
}) {
  return (
    <View style={styles.container}>
        <View style={{height: 25, width: 25, justifyContent: 'center', marginRight: 10}}>
            <Icons 
                icon={icon}
                iconName={iconName}
                iconSize={iconSize}
                iconColor={iconColor}
            />
        </View>
      <Text style={T2}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    }
})