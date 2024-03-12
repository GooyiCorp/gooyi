import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H1, H3, H4, H5, T2, T3 } from '../../../helper/constants/text'
import { useNavigation } from '@react-navigation/native'
import HomeHeader from '../../../components/components_Home/HomeHeader'
import Icons, { icons } from '../../../components/universal/Icons/Icons'
import StatisticBox from '../../../components/components_Home/StatisticBox'

export default function HomeScreen({navigation}) {
  // const navigation = useNavigation()
  return (
    <View style={styles.screen}>
      <HomeHeader />
      <View 
        style={{
          marginTop: 110, 
          // backgroundColor: 'yellow', 
          width: width,
          paddingHorizontal: 20
        }}
      >
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
        <StatisticBox />
        <View style={{marginTop: 30}}>
        <Text style={H5}>Meine Deals</Text>
        </View>
      </View>
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