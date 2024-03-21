import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T1, T3 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'

export default function ItemCard() {
  return (
    <View 
        style={{
            width: width/2-30,
            height: 100,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            marginBottom: 20,
            paddingVertical: 10,
            paddingHorizontal: 15,
            justifyContent: 'space-between'
        }}
    >
      <View style={{height: 30, width: 30, backgroundColor: COLORS.white, position: 'absolute', top: -10, right: -10, justifyContent: 'center', alignItems: 'center'}}>
        <Icons 
          icon={icons.Ionicons}
          iconName={'close'}
          iconSize={30}
          iconColor={COLORS.grey}
        />
      </View> 
      <Text style={[T1, {fontFamily: 'RH-Bold'}]}>Artikel</Text>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[T3, {fontFamily: 'RH-Bold'}]}>20</Text>
          <Text style={T3}> Punkte</Text>
        </View>

        <View style={{width: 30, height: 30, backgroundColor: COLORS.primary, marginRight: -5, borderRadius: 9, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.white}]}>2</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({})