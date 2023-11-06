import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import Icons from './Icons'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setHideActivityHistoryModal, setShowActivityHistoryModal } from '../../redux/slices/showModalSlice'

export default function TapButton({
    icon,
    iconName,
    iconSize,
    iconStyle,
}) {
    const dispatch = useDispatch()
    const showActivityHistoryModal = useSelector((state) => state.showModal.activityHistoryModal)

    const handlePressButton = () => {
        showActivityHistoryModal? dispatch(setHideActivityHistoryModal()) : dispatch(setShowActivityHistoryModal())
    }

  return (
    <Pressable onPress={handlePressButton} style={[styles.button, {backgroundColor: showActivityHistoryModal? COLORS.grey : COLORS.default}]}>
        <Icons 
            icon={icon}
            iconName={iconName}
            iconColor={showActivityHistoryModal? COLORS.white : COLORS.grey}
            iconSize={iconSize}
            iconStyle={iconStyle}
        />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        height: 38,
        width: 38,
        backgroundColor: COLORS.default,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})