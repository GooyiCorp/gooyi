import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import BigButton from '../../components_LogIn/BigButton'
import { H4, T1, T2 } from '../../../constants/text-style'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setHideQueueAlert, setHideQueueSmall, setJoinedQueue, setLeaveQueue } from '../../../redux/slices/queueSlice'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { setHideQueueOverviewModal } from '../../../redux/slices/showModalSlice'

export default function QueueAlert({
}) {
    // Redux
    const dispatch = useDispatch()
    const showAlert = useSelector((state) => state.queue.showAlert)
    const navigation = useNavigation()

    // Reanimated
    const animation = useSharedValue(0)
    const translateCard = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: animation.value}
            ],
            opacity: interpolate(animation.value, [0.5,1], [0,1])
        }
    })

    // Handler
    useEffect(() => {
        if (showAlert) {
            animation.value = withTiming(1, {duration: 300, easing: Easing.bezier(0.34, 0.95, 0.76, 1.09)})
        } else {
            animation.value = withDelay(200, withTiming(0, {duration: 300}))
        }
    }, [showAlert])

    const handleConfirm = () => {
        // Thanh - thoat Queue

        dispatch(setLeaveQueue())
        dispatch(setHideQueueAlert())
        setTimeout(() => {
            dispatch(setHideQueueOverviewModal())
            dispatch(setHideQueueSmall())
        }, 500)
    }

  return (
        <Animated.View style={[styles.card, translateCard]}>
            {/* Info View */}
            <View style={{marginBottom: 20}}>
                <Text style={[H4, {textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>Warteschlange verlassen</Text>
                <Text style={[T2, {textAlign: 'center', marginTop: 10}]}>Du bist dabei die Warteschlange zu verlassen. Diese Vorgang kann nicht mehr rückgängig gemacht werden.</Text>
                <Text style={[T2, {textAlign: 'center', marginTop: 8, fontFamily: 'RH-Medium'}]}>Möchtest du fortfahren?</Text>
            </View>
            {/* Button View */}
            <View>
                <BigButton 
                    title={'Bestätigen'}
                    bgStyle={{
                        maxWidth: '100%',
                        backgroundColor: COLORS.grey,
                        borderRadius: 10,
                        marginVertical: 0,
                    }}
                    titleStyle={{
                        color: COLORS.white
                    }}
                    onPress={handleConfirm}
                />
                <BigButton 
                    title={'Abbrechen'}
                    bgStyle={{
                        maxWidth: '100%',
                        backgroundColor: COLORS.ivoryDark,
                        borderRadius: 10,
                        marginVertical: 0,
                        marginTop: 10
                    }}
                    onPress={() => dispatch(setHideQueueAlert())}
                />
            </View>
        </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 6,
    },

    card: {
        width: 0.7*width,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        justifyContent: 'space-between',
        zIndex: 7,
        position: 'absolute',
        alignSelf: 'center',
        marginRight: 'auto'
    }
})