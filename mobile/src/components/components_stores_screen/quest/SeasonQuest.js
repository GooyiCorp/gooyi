import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../../constants/size'
import { H2, H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import ProgressBar from '../../components_universal/progressBar/ProgressBar'
import PointsButton from './PointsButton'

export default function SeasonQuest({
    progress,
    maxProgress,
    time,
}) {
  return (
    <View style={styles.card}>

        <View style={{height: 30, width: 30, borderRadius: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 10, right: 10, backgroundColor: COLORS.primary}}>
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'firework'}
                iconSize={20}
                iconColor={'#da6178'}
            />
        </View>


        <Text style={[H3, {color: COLORS.white, fontFamily: 'RH-Medium'}]}>Neujahr Event</Text>
        <Text style={[T2, {color: COLORS.white, fontFamily: 'RH-Medium'}]}>21. Februar - 30. März</Text>

        <Text style={[T2, {color: COLORS.white, fontFamily: 'RH-Medium', marginTop: 10}]}>Schließe alle 30 Neujahr{"\n"}Herausforderungen ab!</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        
        <View>

          <View style={{flexDirection: 'row', alignItems: 'center', height: 18 }}>
            <Icons 
              icon={icons.Entypo}
              iconName={'time-slot'}
              iconSize={12}
              iconColor={COLORS.white}
              iconStyle={{
                marginRight: 5
              }}
            />
            <Text style={[T4, {color: COLORS.white, fontFamily: 'RH-Medium'}]}>{time}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProgressBar 
              barWidth={200}
              barHeight={8}
              progressValue={progress}
              maxProgressValue={maxProgress}
              defaultColor1={COLORS.white}
              barContainerStyle={{
                backgroundColor: COLORS.white03
              }}
            />
            <Text style={[T3, {color: COLORS.white, marginLeft: 5}]}>{progress}/{maxProgress}</Text>
          </View>


        </View>


        </View>
        <View style={{height: 50, width: 75, backgroundColor: COLORS.ivory, position: 'absolute', bottom: 15, right: 15, borderRadius: 10}}></View>

    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: width-60,
        backgroundColor: '#da6178',
        borderRadius: 16,
        marginBottom: 30,
        paddingVertical: 15,
        paddingHorizontal: 15,
    }
})