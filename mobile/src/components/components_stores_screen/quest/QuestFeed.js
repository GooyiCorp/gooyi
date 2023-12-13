import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import { T1, T2, T3, T4 } from '../../../constants/text-style'
import ProgressBar from '../../components_universal/progressBar/ProgressBar'
import PointsButton from './PointsButton'
import Icons, { icons } from '../../components_universal/Icons'
import Animated, { CurvedTransition, FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutRight, FadeOutUp, SequencedTransition, Transition, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

export default function QuestFeed({
  time,
  progress,
  maxProgress,
  points,
  title,
  handleDelete,
}) {

  return (
    <Animated.View 
      style={[styles.container, {backgroundColor: progress == maxProgress ? COLORS.mainBackground: COLORS.ivory}]} 
      exiting={FadeOutDown} 
      entering={FadeIn}
      layout={SequencedTransition}
    >
      <Text style={[T2, styles.taskText]} >{title}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        
        <View>

          <View style={{flexDirection: 'row', alignItems: 'center', height: 18 }}>
            <Icons 
              icon={icons.Entypo}
              iconName={'time-slot'}
              iconSize={12}
              iconColor={COLORS.grey}
              iconStyle={{
                marginRight: 5
              }}
            />
            {!time && 
              <Icons 
                icon={icons.Entypo}
                iconName={'infinity'}
                iconSize={16}
                iconColor={COLORS.grey}
              />}
              
            {time && <Text style={[T4, {color: COLORS.grey, fontFamily: 'RH-Medium'}]}>{time}</Text>}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProgressBar 
              barWidth={200}
              barHeight={8}
              progressValue={progress}
              maxProgressValue={maxProgress}
            />
            <Text style={[T3, {color: COLORS.grey, marginLeft: 5}]}>{progress}/{maxProgress}</Text>
          </View>

        </View>

        <PointsButton 
          progressValue={progress}
          maxProgressValue={maxProgress}
          points={points}
          handleDelete={handleDelete}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        // height: 100,
        width: width-60,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
        overflow: 'hidden'
    },

    taskText: {
        alignSelf: 'center',
        color: COLORS.grey,
        fontFamily: 'RH-Medium'
    }
})