import React, { useEffect } from 'react'
import { StyleSheet,View, Text, Image } from 'react-native'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { MainHeader } from '../../index/navIndex.js'
// Constant
import { T1, T2 } from '../../constants/text-style.js'
import { COLORS } from '../../index/constantsindex.js'
import { height, width } from '../../constants/size.js'
// Helpers
import Request from '../../helper/request.js'
// Components
import Icons, {icons} from '../../components/components_universal/Icons.js'
import LogIn from '../logIn-screens/LogIn.js'
import RoundButton from '../../components/components_universal/RoundButton.js'
import IconLabelButton from '../../components/components_universal/IconLabelButton.js'
import TapButton from '../../components/components_universal/TapButton.js'
import ActivityHistoryModal from '../../components/components_profile_screen/ActivityHistoryModal.js'






//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ProfileScreen({
  hideTabNav,
  showTabNav,
}) {

  // ------------------------------------------ Get API
  const userName = 'Thanh Nguyen'
  const userID = '122.3422.997'
  const entryDate = 'Oktober 2023'
  const couponsAvailable = 15
  const couponsShortValidity = 5
  
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  const getInfo = async () => {
    const response = await Request('user/info', 'get', null, accessToken)
    console.log(response.data);
    return response.data
    // Duc anh: set data vao 
  }
  useEffect(() => {
    getInfo()
  }, []) // Loi: lau lau k load dc, nghi cach cho rerender ?
  
  // Global State, userSlide - LogIn required? show/hide
  const logIn = !useSelector((state) => state.user.isLoggedIn)
  // const token = useSelector((state) => state.user.accessToken)
  // console.log('token:', token)
  
  // Locate Modal ----------------------------------------------------------------------
  const showActivityHistoryModal = useSelector((state) => state.showModal.activityHistoryModal)
  
  useEffect(() => {
    showActivityHistoryModal? hideTabNav() : showTabNav()
  }, [showActivityHistoryModal])

  return (
    <View style={{height: height, width: width}}>

      {!logIn && <ActivityHistoryModal/>}
      {logIn && <LogIn/>}
      {/* Main Header */}
      <MainHeader 
        title={userName}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
        notificationButton
        onPressNotificationButton={() => navigation.navigate('Profile', {screen: 'Notification'})}
        headerContainerStyle={{backgroundColor: 'transparent'}}
      />

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={styles.cardStyle}>

        {/* Header */}
        {/* <Text style={[styles.h3, {color: COLORS.grey, marginBottom: 10,}]}>Übersicht</Text> */}

        {/* User ID */}
        <View style={[styles.infoView, {marginTop: 10}]}>

          <Text style={{
            fontFamily: 'RH-Bold',
            fontSize: 16,
            marginRight: 10,
            color: COLORS.white,
            backgroundColor: COLORS.grey,
            paddingLeft: 10,
            paddingRight: 9,
            paddingVertical: 2,
          }}>ID</Text>
          <Text style={T1}>{userID}</Text>
        </View>

        {/* Create Date */}
        <View style={[styles.infoView, {marginTop: 15}]}>
          <Icons 
            icon={icons.MaterialCommunityIcons}
            iconName={'clock'}
            iconSize={20}
            iconColor={COLORS.grey}
            iconStyle={{marginRight: 5}}
          />
          <Text style={T2}>Aktiv, seit {entryDate}</Text>
        </View>

        {/* Statistic */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          {/* Available Coupons */}
          <View style={styles.statisticContainer}>
            <Icons
              icon={icons.MaterialCommunityIcons}
              iconName={'ticket-percent-outline'}
              iconSize={20}
              iconColor={COLORS.grey}
              iconStyle={{
                position: 'absolute',
                top: 8,
                right: 10,
              }}
            />
              <Text style={{fontFamily: 'RH-Bold', color: COLORS.grey ,fontSize: 35, lineHeight: 40}}>{couponsAvailable}</Text>
              <Text style={[T2, {fontFamily: 'RH-Light', lineHeight: 15}]}>Nicht eingelöst</Text>
          </View>

          {/* Short Validity Coupons */}
          <View style={styles.statisticContainer}>
            <Icons
              icon={icons.MaterialCommunityIcons}
              iconName={'ticket-percent-outline'}
              iconSize={20}
              iconColor={COLORS.grey}
              iconStyle={{
                position: 'absolute',
                top: 8,
                right: 10,
              }}
            />
              <Text style={{fontFamily: 'RH-Bold', color: COLORS.grey ,fontSize: 35, lineHeight: 40}}>{couponsShortValidity}</Text>
              <Text style={[T2, {fontFamily: 'RH-Light', lineHeight: 15}]}>Kurze Gültigkeit</Text>
          </View>
        </View>
        
        <View style={{flexDirection: 'row', marginTop: 20}}>

        {/* Setting */}
        <IconLabelButton 
          icon={icons.Ionicons}
          iconName={'settings-sharp'}
          iconSize={22}
          iconColor={COLORS.grey}
          label={'Einstellungen'}
          style={{
            marginRight: 10,
          }}
          onPressButton={() => navigation.navigate('Profile', {screen: 'Setting'})}
        />

        {/* Messages */}
        <RoundButton
          icon={icons.Ionicons}
          iconName={'mail'}
          iconSize={22}
          iconColor={COLORS.grey}
          label={'Einstellungen'}
          style={{
            height: 38,
            width: 38,
            margin: 0,
            borderRadius: 10,
            marginRight: 10,
          }}

        />

        {/* Update */}
        <TapButton 
          icon={icons.MaterialIcons}
          iconName={'history'}
          iconSize={24}
        />

        </View>

        {/* <View style={{height: 100, width: width, backgroundColor: COLORS.mainBackground, position: 'absolute', zIndex: 2, bottom: 0}}></View> */}

        {!logIn && <View style={{width: 200,height: 300, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 40, zIndex: -1, left: 20}}>
          <Image source={require('../../../assets/image/fox2d01.png')} style={{resizeMode: 'contain', maxWidth: '100%'}}/>
        </View>}

      </View>


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}



    </View>
  )
}

const styles = StyleSheet.create({

  cardStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
  },

  t2: {
    fontFamily: 'RH-Regular',
    fontSize: 14,
  },

  h3: {
    fontFamily: 'RH-Light',
    fontSize: 24,
  },

  infoView: {
    flexDirection: 'row', 
    alignItems: 'center',
  },

  statisticContainer: {
    width: 0.41*width,
    borderRadius: 16,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.ivory,
  }
})