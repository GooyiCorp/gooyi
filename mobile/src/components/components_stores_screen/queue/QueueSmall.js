import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../index/constantsindex'
import { height, width } from '../../../constants/size'
import { H1, H3, H4 } from '../../../constants/text-style'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import RoundButton from '../../components_universal/RoundButton'
import Icons, { icons } from '../../components_universal/Icons'

export default function QueueSmall() {
    const navigation = useNavigation()
  return (
    <View style={[styles.container]}>
      <BlurView intensity={10} tint='default' style={{height: height, width: width}}></BlurView>
      <View style={{height: height, width: width, backgroundColor: COLORS.ivoryDark2, position: 'absolute', opacity: 0.7}}></View>
      <View style={{position: 'absolute', height: 60, width: 60, alignItems: 'center', padding: 5, justifyContent: 'center', paddingTop: 10}}>
        <Icons
          icon={icons.MaterialCommunityIcons}
          iconName={'human-queue'}
          iconSize={22}
          iconColor={COLORS.grey}
        />
        <View style={{height: 30, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
          <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>15</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 60,
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        borderRadius: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0.3*height,
        right: 15,
        overflow: 'hidden',
        marginLeft: 30
    },

    shadow: {
        shadowColor:"#686868",
        shadowOffset: {
           width: 0,
           height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 0
    }
})