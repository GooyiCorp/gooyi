import React, { useEffect } from 'react'
import { StyleSheet,View, Text, Image } from 'react-native'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { MainHeader, SubHeader } from '../../index/navIndex.js'
// Constant
import { T1, T2 } from '../../constants/text-style.js'
import { COLORS } from '../../index/constantsindex.js'
import { height, width } from '../../constants/size.js'
// Helpers
import Request from '../../helper/request.js'
// Components
import Icons, {icons} from '../../components/components_universal/Icons.js'
import LogIn from '../logIn-screens/LogIn.js'
import ActivityHistoryModal from '../../components/components_profile_screen/ActivityHistoryModal.js'
import { setEntryDate, setUserId, setUserName } from '../../redux/slices/userSlice.js'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ProfileScreen({
  hideTabNav,
  showTabNav,
}) {

// React Navigation
const navigation = useNavigation()
// Redux
const dispatch = useDispatch()

const accessToken = useSelector(state => state.user.accessToken)
const userName = useSelector(state => state.user.user_name)
const userID = useSelector(state => state.user.user_id)
const entryDate = useSelector(state => state.user.entryDate)
const logIn = !useSelector((state) => state.user.isLoggedIn)

  // ----------------------------  
  // Get Data Section
  // ---------------------------- 
    // Test Data (Delete)
    const couponsAvailable = 15
    const couponsShortValidity = 5
  
    const getInfo = async () => {
      if (!userName) {
        const response = await Request('user/profile/info', 'get', null, accessToken)
        if (response.success) {
          dispatch(setUserId(response.data.user_id))
          dispatch(setUserName(response.data.first_name + ' ' + response.data.last_name))
          const date = new Date(response.data.create_at)
          const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          dispatch(setEntryDate(month[date.getMonth()] + ' ' + date.getFullYear()))
        }
      }
    }
    getInfo()
    // Global State, userSlide - LogIn required? show/hide
    // const token = useSelector((state) => state.user.accessToken)
    // console.log('token:', token)
  
  // ----------------------------  
  // Show Modal Section
  // ---------------------------- 
  // ---- start - Activity Modal
    // Value Section
    const showActivityHistoryModal = useSelector((state) => state.showModal.activityHistoryModal)
    // Check State - Hide / Show : Bottom Tab Bar
    useEffect(() => {
      showActivityHistoryModal? hideTabNav() : showTabNav()
    }, [showActivityHistoryModal])
  // ---- end - Activity Modal

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.card}>
  {/* ---- start - Overlay / Modal Section */}
    {/* Activity History Modal */}
    {!logIn && <ActivityHistoryModal/>}
    {/* Login */}
    {logIn && <LogIn/>}
  {/* ---- end - Modal Section */}

  {/* ---- start - Header Section */}
    {/* Main Header */}
    <MainHeader 
      title={userName}
      qrButton
      onPressQRButton={() => navigation.navigate('QRScan')}
      notificationButton
      onPressNotificationButton={() => navigation.navigate('Profile', {screen: 'Notification'})}
      headerContainerStyle={{backgroundColor: 'transparent'}}
    />
    {/* Sub Header */}
    <SubHeader 
      setting
      onPressSetting={() => navigation.navigate('Profile', {screen: 'Setting'})}
      mail
      activity
    />
  {/* ---- end - Header Section */}
  
  {/* ---- start - Content Section */}
  <View style={{paddingHorizontal: 30}}>

    {/* ---- User ID Section */}
    <View style={{marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}>
      {/* ID Box */}
      <View style={styles.idTextBox}>
        <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.white}]}>ID</Text>
      </View>
      {/* User ID */}
      <Text style={T1}>{userID}</Text>
    </View>

    {/* ---- Create Date Section */}
    <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
      {/* Clock Icon */}
      <Icons 
        icon={icons.MaterialCommunityIcons}
        iconName={'clock'}
        iconSize={20}
        iconColor={COLORS.grey}
        iconStyle={{marginRight: 5}}
      />
      {/* Date */}
      <Text style={T2}>Aktiv, seit {entryDate}</Text>
    </View>

    {/* ---- start - Statistic Section */}
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

      {/* ---- Available Coupons */}
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
      {/* ---- Short Validity Coupons */}
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
    {/* ---- end - Statistic Section */}

  </View>
  {/* ---- end - Content Section */}

  {/* Fox Image */}
  {!logIn && <View style={{width: 200,height: 300, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 40, zIndex: -1, left: 20}}>
    <Image source={require('../../../assets/image/fox2d01.png')} style={{resizeMode: 'contain', maxWidth: '100%'}}/>
  </View>}

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },

  idTextBox: {
    marginRight: 10,
    backgroundColor: COLORS.grey,
    paddingLeft: 8,
    paddingRight: 7,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
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