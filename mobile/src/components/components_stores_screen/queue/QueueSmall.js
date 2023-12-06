import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { H1, H3, H4 } from '../../../constants/text-style'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import RoundButton from '../../components_universal/RoundButton'
import Icons, { icons } from '../../components_universal/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setHideQueueSmall } from '../../../redux/slices/queueSlice'
import { setShowQueueOverviewModal } from '../../../redux/slices/showModalSlice'

export default function QueueSmall () {
    // React Navigation
    const navigation = useNavigation()
    // Redux
    const dispatch = useDispatch()
    const showQueueSmall = useSelector((state) => state.queue.showQueueSmall)
    // handlePress Card
    const handlePress = () => {
      dispatch(setShowQueueOverviewModal())
      // dispatch(setHideQueueSmall())
      // navigation.navigate('QueueOverview')
    }
  return (
    <Pressable style={[styles.container]} onPress={handlePress}>

      <View style={{height:80, width: 60, borderRadius: 30, overflow: 'hidden'}}>
      {/* Blur */}
      <BlurView intensity={10} tint='default' style={{height: height, width: width}}></BlurView>
      {/* Blur Color */}
      <View style={{height: height, width: width, backgroundColor: COLORS.ivoryDark, position: 'absolute', opacity: 0.7}}></View>
      </View>

      {/* Content Section */}
      <View style={{position: 'absolute', flex: 1, alignItems: 'center', padding: 5, justifyContent: 'center'}}>
        {/* Icon */}
        <Icons
          icon={icons.MaterialCommunityIcons}
          iconName={'human-queue'}
          iconSize={22}
          iconColor={COLORS.grey}
          iconStyle={{
            marginVertical: 2
          }}
        />
        {/* Number */}  
        <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>15</Text>
      </View>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0.3*height,
        right: 15,
    },
})