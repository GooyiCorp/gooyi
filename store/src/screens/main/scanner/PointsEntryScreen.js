import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { T1, T2 } from '../../../helper/constants/text'
import ScoringHeader from '../../../components/components_Scanner/ScoringHeader'

export default function PointsEntryScreen({navigation: {goBack}}) {
  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Punkteeingabe</Text>
    </View>
  )
}

const styles = StyleSheet.create({})