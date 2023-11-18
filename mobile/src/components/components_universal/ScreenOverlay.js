import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setHideFilterModal, setHideLocateModal } from '../../redux/slices/showModalSlice'

export default function ScreenOverlay({
    locate,
    search,
}) {

    const dispatch = useDispatch()

    let modal
    if (locate) {
        modal = useSelector((state) => state.showModal.locateModal)
    } else if (search) {
        modal = useSelector((state) => state.showModal.filterModal)
    }
    
    const [showOverlay, setShowOverlay] = useState(false)

    const transitionVal = useSharedValue(0)

    const translateOverlay = useAnimatedStyle(() => {
        return {
            opacity: transitionVal.value
        }
    })

    useEffect(() => {
        if (modal) {
            setShowOverlay(true)
            transitionVal.value = withTiming(1, {duration: 200}) 
        } else {
            transitionVal.value = withTiming(0, {duration: 200})
            setTimeout(() => {
                setShowOverlay(false)
            }, 200)
        }
    }, [modal])

    const handleClose = () => {
        if (locate) {
            dispatch(setHideLocateModal())
        } else if (search) {
            dispatch(setHideFilterModal())
        }
    }

  return (
    <>
    {showOverlay && 
        <Animated.View style={[styles.overlay, translateOverlay]}>
            <Pressable style={{height: height, width: width, position: 'absolute'}} onPress={handleClose}></Pressable>
        </Animated.View>}
    </>
  )
}

const styles = StyleSheet.create({

    overlay: {
        height: height,
        width: width,
        backgroundColor: COLORS.bgTransparencyDark,
        position: 'absolute',
        zIndex: 4,
    }
})