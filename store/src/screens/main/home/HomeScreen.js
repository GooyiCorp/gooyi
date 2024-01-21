import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H1, H3, H4 } from '../../../helper/constants/text'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen({navigation}) {
  // const navigation = useNavigation()
  return (
    <View style={styles.screen}>
      <View style={styles.topSection}>
        <Text style={[H1, {color: COLORS.grey}]}>Hallo, Thai Massage Lounge</Text>
        <Text style={[H4, {color: COLORS.black, fontFamily: 'RH-Medium', marginTop: 10, marginBottom: 150}]}>Statistik</Text>
      </View>
      <View style={styles.midSection}>
        <Text style={[H4, {color: COLORS.black, fontFamily: 'RH-Medium', marginTop: 10, marginBottom: 150}]}>Deals Übersicht</Text>
        <Button title='create new coupon'  onPress={() => navigation.navigate('CreateCoupon')}/>
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