import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Animated from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import RoundButton from './RoundButton'
import { icons } from '../atoms/Icons'
import { moderateScale } from '../../helper/scale'
import { BlurView } from 'expo-blur'

export default function SearchModal({
    onClose
}) {
  return (
    <View style={styles.modalContainer}>
        <TouchableOpacity style={{position: 'absolute', height: height, width: width, zIndex: 0}} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <View style={styles.justifyView}>
        <RoundButton 
        //   icon={icons.Ionicons} 
        //   iconName={'close'} 
        //   iconSize={28} 
        //   iconColor={COLORS.subPrimary} 
          style={{
            backgroundColor: 'transparent',
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            margin: 0
          }}
          onPressButton={onClose}
        />

        
        <View style={[styles.searchContainer]}>
                <TextInput
                style={{paddingHorizontal: 15}} 
                placeholder={'Search something...'}
                />
        </View>
        
        <RoundButton 
          icon={icons.Feather} 
          iconName={'arrow-right'} 
          iconSize={28} 
          iconColor={COLORS.grey} 
          style={{
            backgroundColor: 'transparent',
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            margin: 0
          }}
        />
        </View>
        </TouchableOpacity>
        {/* <BlurView intensity={16}  style={{height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white05, zIndex: -1, position:'absolute'}}></BlurView> */}
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        height: height,
        width: width,
        position: 'absolute',
        zIndex: 1,
    },

    searchContainer: {
        width: width-150,
        height: 40,
        backgroundColor: '#f8f8f8',
        borderRadius: 50,
        justifyContent: 'center',
      },

   justifyView: {
        width: width,
        height: 60,
        flexDirection: 'row',
        marginTop: 100, 
        paddingHorizontal: 30, 
        justifyContent: 'space-between',
        alignItems: 'center'
   } 
})