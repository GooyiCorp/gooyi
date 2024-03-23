import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../helper/constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icons, { icons } from '../Icons/Icons'
import { H5 } from '../../../helper/constants/text'

export default function SubscreensHeader({
    title,
    onPress,
}) {
  return (
    <View 
        style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            height: 110,
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
                iconName={'arrow-back'}
                iconSize={30}
                iconColor={COLORS.grey}
            />
        </TouchableOpacity>
        <Text style={[H5, {fontFamily: 'RH-Regular', marginRight: 5}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})