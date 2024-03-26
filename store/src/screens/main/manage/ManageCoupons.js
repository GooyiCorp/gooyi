import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SubscreensHeader from '../../../components/universal/Header/SubscreensHeader'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderButton from '../../../components/universal/Buttons/HeaderButton'
import { COLORS } from '../../../helper/constants/colors'
import { height, width } from '../../../helper/constants/size'
import CouponBigCard from '../../../components/components_Manage/CouponBigCard'
import SectionTitle from '../../../components/universal/Header/SectionTitle'
import { T1 } from '../../../helper/constants/text'
import Icons, { icons } from '../../../components/universal/Icons/Icons'

export default function ManageCoupons({navigation, navigation: {goBack}}) {
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
        <View style={{width: width, paddingHorizontal: 25, marginTop: 30}}>
            <SectionTitle title={'Aktive Coupons'}/>
            <CouponBigCard />
            <CouponBigCard />
        </View>

        <View style={{width: width, paddingHorizontal: 25, marginTop: 20}}>
            <SectionTitle title={'Pausierte Coupons'}/>
            <CouponBigCard/>
        </View>

        <View style={{
            position: 'absolute', 
            zIndex: 6,
            bottom: 0,
            width: width, 
            paddingBottom: 40,
            paddingTop: 20, 
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity 
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: COLORS.primary,
                    borderRadius: height,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}
                onPress={() => navigation.navigate('CreateCoupon')}
            >
                <Text style={[T1, {color: COLORS.white, fontFamily: 'RH-Bold'}]}>Neue Coupon erstellen</Text>
                <Icons 
                    icon={icons.AntDesign}
                    iconName={'plus'}
                    iconSize={30}
                    iconColor={COLORS.white}
                    iconStyle={{
                        marginRight: -5
                    }}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})