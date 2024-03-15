import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../helper/constants/colors'
import { H5 } from '../../../helper/constants/text'
import Icons, { icons } from '../Icons/Icons'

export default function ModalHeader({
    onPress,
    title
}) {
  return (
    <View 
        style={{
            paddingHorizontal: 20,
            height: 70,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
    >
        <TouchableOpacity
            onPress={onPress}
        >
            <Icons 
                icon={icons.Ionicons}
                iconName={'close'}
                iconSize={30}
                iconColor={COLORS.grey}
            />
        </TouchableOpacity>
        <Text style={[H5, {fontFamily: 'RH-Regular', marginRight: 5}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})