import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H1, H3, H4, H5, T2, T3 } from '../../../helper/constants/text'
import { useNavigation } from '@react-navigation/native'
import HomeHeader from '../../../components/components_Home/HomeHeader'
import Icons, { icons } from '../../../components/universal/Icons/Icons'
import StatisticBox from '../../../components/components_Home/StatisticBox'
import {
  LineChart,
} from "react-native-chart-kit";
import DealCard from '../../../components/components_Home/DealCard'

export default function HomeScreen({navigation}) {
  // const navigation = useNavigation()
  return (
    <View style={styles.screen}>
      <HomeHeader />

      <ScrollView 
        style={{
          marginTop: 110, 
          // backgroundColor: 'yellow', 
          width: width,
          paddingHorizontal: 20
        }}
      >
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={H5}>Übersicht</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={T2}>7 Tage</Text>
            <Icons 
              icon={icons.MaterialIcons}
              iconName={'arrow-drop-down'}
              iconSize={25}
              iconColor={COLORS.grey}
              iconStyle={{
                marginRight: -5
              }}
            />
          </View>
        </View>

        {/* ---- start - LineChart */}
        <LineChart
          width={width}
          height={160}
          data={{
            labels: ["25.02", "26.02", "27.02", "28.02", "29.02", "01.03", '02.03'],
            datasets: [
              {
                data: [345, 350, 380, 382, 378, 390, 400],
                color: (opacity = 1) => COLORS.primary,
                strokeWidth: 2,
              }
            ]
          }}
          chartConfig={{       
            backgroundGradientFrom: 'white', backgroundGradientTo: 'white', 
            decimalPlaces: 0,
            color: (opacity = 1) => COLORS.grey,
          }}
          withDots={false}
          withShadow={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          segments={2}
          style={{
            marginLeft: -20,
            marginTop: 20,
            marginBottom: 30
          }}
          // fromZero={true}
          // fromNumber={500}
        />
        {/* ---- end - LineChart */}

        <StatisticBox />
        <View style={{marginTop: 30, paddingHorizontal: 10, marginBottom: 20}}>
          <Text style={H5}>Meine Deals</Text>
        </View>
        <DealCard />
      {/* </View>
      <View> */}


    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,

        // justifyContent: 'center',
        alignItems: 'center',

        
    },

    topSection: {
      width: width,
      paddingTop: 120, paddingHorizontal: 30, paddingBottom: 20,
      backgroundColor: COLORS.ivory,
      borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    },

    midSection: {
      paddingTop: 10,
      width: width,
      paddingHorizontal: 30,
    }

})