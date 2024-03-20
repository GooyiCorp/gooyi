import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import Icons, { icons } from '../../../components/universal/Icons/Icons'
import { H1, H5, T1, T2 } from '../../../helper/constants/text'
import PointsTransactionCard from '../../../components/components_History/PointsTransactionCard'
import PointsTransactionDayCard from './PointsTransactionDayCard'

export default function PointsHistoryScreen() {

  const PointsTransactionList = [
    {
      date: 'Sonntag, 7. Januar 2024',
      totalPoints: 30,
      transaction: [
        {name: 'Nathalie Akami', transactionID: 'NK29HA23JK', points: 20},
        {name: 'Benjamin', transactionID: 'HH12JA452K', points: 10},
      ]
    },
    {
      date: 'Samstag, 6. Januar 2024',
      totalPoints: 120,
      transaction: [
        {name: 'Nathan Zhao', transactionID: 'NK29HA23J2', points: 20},
        {name: 'Benjamin', transactionID: 'HH12JA4521', points: 10},
        {name: 'Sebian Wolz', transactionID: 'HH12JA452K', points: 50},
        {name: 'Hamid K. Altani', transactionID: 'HH12JA422K', points: 25},
      ]
    },
  ]


  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white}}>
        <View style={{marginTop: 120, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
            <View 
                style={{
                    height: 43, 
                    width: width-93, 
                    borderRadius: 23,
                    borderWidth: 0.5,
                    borderColor: COLORS.grey
                }}
            >

            </View>

            <View 
                style={{
                    height: 43,
                    width: 43,
                    borderRadius: 23,
                    backgroundColor: COLORS.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icons 
                    icon={icons.MaterialCommunityIcons}
                    iconName={'calendar-search'}
                    iconSize={30}
                    iconColor={COLORS.grey}
                />
            </View>

        </View>
        <View 
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingTop: 15, 
            alignItems: 'flex-end',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            borderColor: COLORS.lightGrey
          }}
        >
          <Text style={[T1, {fontFamily: 'RH-Medium'}]}>Sonntag, 7. Januar 2024</Text>
          <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.black, marginRight: 3}]}>30</Text>
        </View>

        <ScrollView
          style={{
            paddingHorizontal: 20
          }}
        >
          {PointsTransactionList.map((transaction) => (
            <PointsTransactionDayCard 
              key={transaction.date}
              date={transaction.date}
              totalPoints={transaction.totalPoints}
              header={true}
              transactionList={transaction.transaction}
            />
          ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})