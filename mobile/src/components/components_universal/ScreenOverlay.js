import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setHideFilterModal, setHideLocateModal, setHideQueueModal, setHideQueueOverviewModal } from '../../redux/slices/showModalSlice'
import { setHideQueueAlert } from '../../redux/slices/queueSlice'

export default function ScreenOverlay({
    locate,
    search,
    queue,
    queueAlert,
    queueOverview,
    delay,
    cardStyle,
}) {

    const dispatch = useDispatch()

    let modal
    if (locate) {
        modal = useSelector((state) => state.showModal.locateModal)
    } else if (search) {
        modal = useSelector((state) => state.showModal.filterModal)
    } else if (queue) {
        modal = useSelector((state) => state.showModal.queueModal)
    } else if (queueAlert) {
        modal = useSelector((state) => state.queue.showAlert)
    } else if (queueOverview) {
        modal = useSelector((state) => state.showModal.queueOverviewModal)
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
            transitionVal.value = withDelay(delay, withTiming(0, {duration: 200}))
            setTimeout(() => {
                setShowOverlay(false)
            }, delay+200)
        }
    }, [modal])

    const handleClose = () => {
        if (locate) {
            dispatch(setHideLocateModal())
        } else if (search) {
            dispatch(setHideFilterModal())
        } else if (queue) {
            dispatch(setHideQueueModal())
        } else if (queueAlert) {
            dispatch(setHideQueueAlert())
        } else if (queueOverview) {
            dispatch(setHideQueueOverviewModal())
        }
    }

  return (
    <>
    {showOverlay && 
        <Animated.View style={[styles.overlay, translateOverlay, cardStyle]}>
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