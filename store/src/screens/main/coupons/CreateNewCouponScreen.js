import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SubPageHeader from '../../../components/components_Navigation/SubPageHeader'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H1 } from '../../../helper/constants/text'
import BigButton from '../../../components/universal/Buttons/BigButton'
import InputCouponTitle from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponTitle'
import InputDistributionTime from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputDistributionTime'
import InputCouponDescription from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponDescription'
import InputCouponAmounts from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponAmounts'
import InputCouponValidityPeriod from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponValidityPeriod'
import CalendarPicker from 'react-native-calendar-picker';
import Icons, { icons } from '../../../components/universal/Icons/Icons'

export default function CreateNewCouponScreen({
    navigation: {goBack}
}) {

    const [couponTitle, setCouponTitle] = useState('')

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    console.log(selectedStartDate) 
    console.log(selectedEndDate)
    const handleLeaveInput = () => {
        Keyboard.dismiss()
    }

    const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
        return {
            
            style: {
            // borderRadius: 12,
            // backgroundColor: 'cyan',
            },
            textStyle: {
            fontSize: 15,
            fontFamily: 'RH-Bold'
            }
        };
      }
      
  return (
    <View style={styles.screen}>
        <View style={{position: 'absolute', height: height, width: width, justifyContent: 'center', alignItems: 'center', zIndex: 2, paddingHorizontal: 30, backgroundColor: COLORS.bgTransparencyDark}}>
            <View style={{width: width*0.9, height: width*0.9,backgroundColor: COLORS.white, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 20}}>

            <CalendarPicker
                allowRangeSelection={true}
                onDateChange={(startDate, endDate) => {setSelectedStartDate(startDate), setSelectedEndDate(endDate)}}
                width={width*0.85}
                weekdays={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}
                months={['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'september', 'Oktober', 'November', 'Dezember']}
                nextTitle='next'
                previousComponent={<Icons icon={icons.MaterialCommunityIcons} iconName={'close'} iconSize={20} iconColor={'black'} />}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                dayLabelsWrapper={{borderBottomWidth: 0, paddingTop: 20}}
                headerWrapperStyle={{justifyContent: 'flex-end', paddingTop: 35}}
                todayBackgroundColor={COLORS.grey}
                todayTextStyle={{color: COLORS.white}}
                monthYearHeaderWrapperStyle={{position: 'absolute', left: 10, alignSelf: 'flex-end'}}
                monthTitleStyle={{fontFamily: 'RH-Bold', fontSize: 16, textTransform: 'uppercase'}}
                yearTitleStyle={{fontFamily: 'RH-Regular', fontSize: 16}}
                // showDayStragglers={true}
                // dayShape='square'
                firstDay={1}
                selectedDayColor={COLORS.primary}
                selectedRangeStyle={{opacity: 0.5}}
                selectedRangeStartStyle={{opacity: 1, }}
            />
            </View>
        </View>
        <Pressable 
        style={{
            height: height, 
            width: width, 
            zIndex: 1,
        }} 
        onPress={handleLeaveInput} 
      >
        <SubPageHeader 
            onPressGoBack={() => goBack()}
        />
        <View style={styles.topSection}>
            <Text style={[H1, {color: COLORS.grey}]}>Neue Coupon</Text>
        </View>
        <View style={styles.midSection}>
            <InputCouponTitle 
                setInputData={setCouponTitle}
            />
            <InputDistributionTime />
            <View style={{flexDirection: 'row'}}>
                <InputCouponAmounts />
                <InputCouponValidityPeriod />
            </View>
            <InputCouponDescription />
        </View>
        </Pressable>
        <BigButton 
            label={'Coupon erstellen'}
            styleContainer={{
                borderRadius: 12,
                position: 'absolute',
                bottom: 30
            }}
        />
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

        paddingHorizontal: 30
    },

    topSection: {
        width: width,
        paddingTop: 120, paddingHorizontal: 30, paddingBottom: 20,
        // backgroundColor: COLORS.ivory,
        borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
      },

      midSection: {
        paddingTop: 10,
        width: width,
        paddingHorizontal: 30,
      }
})