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
import { getDate } from '../../../helper/time'
import IconButton from '../../../components/universal/Buttons/IconButton'
import WheelPicker from 'react-native-wheely';

export default function CreateNewCouponScreen({
    navigation: {goBack}
}) {
    const [showCalendar, setShowCalendar] = useState(false)

    
    
    const [couponTitle, setCouponTitle] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [amounts, setAmounts] = useState(null)
    const [validity, setValidity] = useState(null)
    const [description, setDescription] = useState('')

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const handleLeaveInput = () => {
        Keyboard.dismiss()
    }

    const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
        return { textStyle: { fontSize: 15, fontFamily: 'RH-Bold' } };
      }
      
    const handleConfirmCalendarSelect = () => {
        setStartDate(selectedStartDate)
        setEndDate(selectedEndDate)
        // setSelectedStartDate(null)
        // setSelectedEndDate(null)
        setShowCalendar(false)
    }

    const handleResetCalendarSelect = () => {
        setStartDate(null)
        setEndDate(null)
        // setSelectedEndDate(null)
        // setSelectedStartDate(null)
    }
  return (
    <View style={styles.screen}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    <WheelPicker
      selectedIndex={selectedIndex}
      options={['1 Monat', '2 Monate', '3 Monate', '4 Monate', '5 Monate', '6 Monate']}
      onChange={(index) => setSelectedIndex(index)}
    />

        </View>
{showCalendar ? 
    <View style={{position: 'absolute', height: height, width: width, justifyContent: 'center', alignItems: 'center', zIndex: 2, paddingHorizontal: 30,}}>
            <View style={{width: width*0.9,backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 20,zIndex: 2}}>

                <CalendarPicker
                    allowRangeSelection={true}
                    onDateChange={(date, type) => {type == 'START_DATE' ? setSelectedStartDate(date) : setSelectedEndDate(date)}}
                    width={width*0.85}
                    
                    // Title
                    weekdays={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}
                    months={['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']}
                    // Buttons
                    previousComponent={
                        <View style={{height: 30, width: 30, backgroundColor: COLORS.ivory, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                            <Icons icon={icons.Ionicons} iconName={'chevron-back'} iconSize={22} iconColor={COLORS.grey} />
                        </View>
                    }
                    nextComponent={
                        <View style={{height: 30, width: 30, backgroundColor: COLORS.ivory, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                            <Icons icon={icons.Ionicons} iconName={'chevron-forward'} iconSize={20} iconColor={COLORS.grey} />
                        </View>
                    }
                    customDayHeaderStyles={customDayHeaderStylesCallback}
                    dayLabelsWrapper={{borderBottomWidth: 0, paddingTop: 20}}
                    // headerWrapperStyle={{paddingTop: 35}}
                    todayBackgroundColor={COLORS.grey}
                    monthTitleStyle={{fontFamily: 'RH-Bold', fontSize: 16, textTransform: 'uppercase'}}
                    yearTitleStyle={{fontFamily: 'RH-Regular', fontSize: 16}}
                    firstDay={1}
                    selectedDayColor={COLORS.primary}
                    selectedRangeStyle={{width: 28, height: 28, borderRadius: 10, opacity: 0.6}}
                    allowBackwardRangeSelect={true}
                    selectedRangeStartStyle={{opacity: 1, width: 28, height: 28, borderStartStartRadius: 10, borderEndStartRadius: 10, borderEndEndRadius: 10, borderStartEndRadius: 10, backgroundColor: COLORS.primary}}
                    selectedRangeEndStyle={{opacity: 1, width: 28, height: 28, borderStartStartRadius: 10, borderEndStartRadius: 10, borderEndEndRadius: 10, borderStartEndRadius: 10, backgroundColor: COLORS.primary}}
                    selectedDayTextStyle={{color: COLORS.white}}
                    selectYearTitle='Jahr'
                    selectMonthTitle=''
                    minRangeDuration={2}
                    selectedStartDate={startDate}
                    selectedEndDate={endDate}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', marginTop: 20}}>
                    <BigButton 
                        label={selectedStartDate == startDate && selectedEndDate == endDate? 'Abbrechen' : 'Betätigen'}
                        styleContainer={{
                            width: '80%',
                            borderRadius: 10,
                            backgroundColor: COLORS.ivory,
                            marginRight: 10
                        }}
                        styleLabel={{
                            color: COLORS.grey
                        }}
                        onPress={handleConfirmCalendarSelect}
                    />
                    <IconButton 
                        icon={icons.MaterialCommunityIcons}
                        iconName={'undo'}
                        iconSize={26}
                        iconColor={COLORS.grey}
                        styleContainer={{
                            height: 50, 
                            width: '15%',
                            borderRadius: 10,
                            backgroundColor: COLORS.ivory
                        }}
                        onPress={handleResetCalendarSelect}
                    />
                </View>
            </View>
            <Pressable 
                style={{height: height, width: width, position: 'absolute', zIndex: 0, backgroundColor: COLORS.bgTransparencyDark}}
                onPress={() => setShowCalendar(false)}
            />
        </View> 
        : null}

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
            <InputDistributionTime 
                onPress={() => {setShowCalendar(true), Keyboard.dismiss()}}
                showCalendar={() => {setShowCalendar(true), Keyboard.dismiss()}}
                calendarData={startDate && endDate ? getDate(startDate) + ' - ' + getDate(endDate) : null}
            />
            <View style={{flexDirection: 'row'}}>
                <InputCouponAmounts 
                    setInputData={setAmounts}
                />
                <InputCouponValidityPeriod 
                    setInputData={setValidity}
                />
            </View>
            <InputCouponDescription 
                setInputData={setDescription}
            />


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