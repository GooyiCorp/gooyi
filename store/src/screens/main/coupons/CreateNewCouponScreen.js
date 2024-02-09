import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// Helpers
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { H1 } from '../../../helper/constants/text'
import { getDate } from '../../../helper/time'
// Calendar
import CalendarPicker from 'react-native-calendar-picker';
// Wheel Picker
import WheelPicker from 'react-native-wheely';
// Components
import SubPageHeader from '../../../components/components_Navigation/SubPageHeader'
import BigButton from '../../../components/universal/Buttons/BigButton'
import InputCouponTitle from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponTitle'
import InputDistributionTime from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputDistributionTime'
import InputCouponDescription from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponDescription'
import InputCouponAmounts from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponAmounts'
import InputCouponValidityPeriod from '../../../components/components_Coupon/components_CreateCoupon/Input_CreateCoupon/InputCouponValidityPeriod'
import Icons, { icons } from '../../../components/universal/Icons/Icons'
import IconButton from '../../../components/universal/Buttons/IconButton'
import ValidityPeriodPickerModal from '../../../components/components_Coupon/components_CreateCoupon/Modal_CreateCoupon/ValidityPeriodPickerModal'
import { useDispatch, useSelector } from 'react-redux'
import { setShowValidityTimePicker } from '../../../redux/slices/createCouponSlice'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CreateNewCouponScreen({
    navigation: {goBack}
}) {

    const dispatch = useDispatch()
    const [showCalendar, setShowCalendar] = useState(false)

    
    
    const [couponTitle, setCouponTitle] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [amounts, setAmounts] = useState(null)
    const [validity, setValidity] = useState(null)
    const [description, setDescription] = useState('')

    const validityTime = useSelector((state) => state.createCoupon.validityTime)
    console.log(validityTime)

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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>
    <ValidityPeriodPickerModal />
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>

    </View>

    {/* ---- start - Calendar Overlay Section */}
    {showCalendar ? 
    <View style={{position: 'absolute', height: height, width: width, justifyContent: 'center', alignItems: 'center', zIndex: 2, paddingHorizontal: 30,}}>
        {/* ---- Calendar container */}
        <View style={{width: width*0.9,backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 20,zIndex: 2}}>
            {/* ---- start - Calendar */}
            <CalendarPicker
                onDateChange={(date, type) => {type == 'START_DATE' ? setSelectedStartDate(date) : setSelectedEndDate(date)}}
                selectedStartDate={startDate}
                selectedEndDate={endDate}
                firstDay={1}
                allowRangeSelection={true}
                allowBackwardRangeSelect={true}
                // Calendar Size
                width={width*0.85}
                // Header Title
                weekdays={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}
                months={['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']}
                selectYearTitle='Jahr'
                selectMonthTitle=''
                // ---- Buttons
                    // back Button 
                    previousComponent={
                        <View style={{height: 30, width: 30, backgroundColor: COLORS.ivory, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                            <Icons icon={icons.Ionicons} iconName={'chevron-back'} iconSize={22} iconColor={COLORS.grey} />
                        </View>
                    }
                    // next Button
                    nextComponent={
                        <View style={{height: 30, width: 30, backgroundColor: COLORS.ivory, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                            <Icons icon={icons.Ionicons} iconName={'chevron-forward'} iconSize={20} iconColor={COLORS.grey} />
                        </View>
                    }
                // ---- Style
                    customDayHeaderStyles={customDayHeaderStylesCallback}
                    dayLabelsWrapper={{borderBottomWidth: 0, paddingTop: 20}}
                    // Title Style
                    monthTitleStyle={{fontFamily: 'RH-Bold', fontSize: 16, textTransform: 'uppercase'}}
                    yearTitleStyle={{fontFamily: 'RH-Regular', fontSize: 16}}
                    // Selected Style
                    selectedDayColor={COLORS.primary}
                    selectedDayTextStyle={{color: COLORS.white}}
                    selectedRangeStyle={{width: 28, height: 28, borderRadius: 10, opacity: 0.6}}
                    selectedRangeStartStyle={{opacity: 1, width: 28, height: 28, borderStartStartRadius: 10, borderEndStartRadius: 10, borderEndEndRadius: 10, borderStartEndRadius: 10, backgroundColor: COLORS.primary}}
                    selectedRangeEndStyle={{opacity: 1, width: 28, height: 28, borderStartStartRadius: 10, borderEndStartRadius: 10, borderEndEndRadius: 10, borderStartEndRadius: 10, backgroundColor: COLORS.primary}}
                    // To Day Style
                    todayBackgroundColor={COLORS.grey}
            />
            {/* ---- end - Calendar */}

            {/* ---- start - Button Section */}
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
            {/* ---- end - Button Section */}
        </View>
        {/* ---- Touch Background */}
        <Pressable 
            style={{height: height, width: width, position: 'absolute', zIndex: 0, backgroundColor: COLORS.bgTransparencyDark}}
            onPress={() => setShowCalendar(false)}
        />
    </View> : null}
    {/* ---- end - Calendar Overlay Section */}

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
                    onPress={() => dispatch(setShowValidityTimePicker())}
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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