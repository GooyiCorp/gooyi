import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderButton from '../../../components/universal/Buttons/HeaderButton'
import { COLORS } from '../../../helper/constants/colors'
import { height, width } from '../../../helper/constants/size'
import CouponBigCard from '../../../components/components_Manage/CouponBigCard'

export default function ManageCoupons({navigation: {goBack}}) {
    const ScannerHeader = [
        {title: 'Genehmigt', route: 'ScannerScreen'},
        {title: 'Eingereicht', route: 'CodeInput'},
        {title: 'Entwürfe', route: 'ManageQuickSelection'},
        {title: 'Archiv', route: 'ManageQuickSelection'}
    ]
    const [selected, setSelected] = useState('Genehmigt')
    const handlePress = (row) => {
        setSelected(row.title)
        // navigation.navigate(row.route)
    }
  return (
    <View style={{width: width, height: height, backgroundColor: COLORS.white}}>
        <SubscreensHeader title={'Coupon Übersicht'} onPress={() => goBack()}/>
        <View style={{
            paddingLeft: 20,
            height: 50,
            backgroundColor: COLORS.white,
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <ScrollView style={{flexDirection: 'row', overflow: 'visible'}} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {ScannerHeader.map((buttons) => (
                    <HeaderButton 
                        key={buttons.title} 
                        title={buttons.title} 
                        onPress={() => handlePress(buttons)}
                        styleContainer={{
                            borderBottomWidth: selected == buttons.title ? 0.5 : 0
                        }}
                        styleTitle={{
                            fontFamily: selected == buttons.title ? 'RH-Bold' : 'RH-Regular',
                            color: selected == buttons.title ? COLORS.grey : COLORS.lightGrey
                        }}
                    />
                ))}
            </ScrollView>
        </View>
        <View style={{width: width, paddingHorizontal: 25}}>
        <CouponBigCard type={'coupon'}/>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({})