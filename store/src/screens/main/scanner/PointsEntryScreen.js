import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H2, T1, T2 } from '../../../helper/constants/text'
import ScoringHeader from '../../../components/components_Scanner/ScoringHeader'
import CalculatorButton from '../../../components/universal/Buttons/CalculatorButton'
import Icons, { icons } from '../../../components/universal/Icons/Icons'

export default function PointsEntryScreen({navigation: {goBack}}) {

  const Calculator = [
    {id: 1, type: 'num', num: '1'},
    {id: 2, type: 'num', num: '2'},
    {id: 3, type: 'num', num: '3'},
    {id: 4, type: 'num', num: '4'},
    {id: 5, type: 'num', num: '5'},
    {id: 6, type: 'num', num: '6'},
    {id: 7, type: 'num', num: '7'},
    {id: 8, type: 'num', num: '8'},
    {id: 9, type: 'num', num: '9'},
    {id: 10, type: 'num', num: '00'},
    {id: 11, type: 'num', num: '0'},
    {id: 12, type: 'del'}
  ]

  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: '25%', width: width, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'RH-Medium', fontSize: 50, color: COLORS.grey}}>20</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingHorizontal: 20,
        }}>
          {Calculator.map((button) => (
            <CalculatorButton key={button.id} type={button.type} num={button.num} size={button.size}/>
          ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})