import React from 'react'
import { StyleSheet, View} from 'react-native'
// React Navigation
import { useNavigation } from '@react-navigation/native'
// Constant
import { height, width } from '../../constants/size'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setResetFilter, setSelectedCategory } from '../../redux/slices/searchSlice'
// Components
import { MainHeader, SubHeader } from '../../index/navIndex'
import PresentationHeader from '../../components/components_universal/PresentationHeader'
import LogInRequired from '../logIn-screens/LogInRequired'






//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CouponsScreen({
  hideTabNav,
  showTabNav,
}) {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const logIn = !useSelector((state) => state.user.isLoggedIn)

  const couponActivePage = useSelector((state) => state.subNav.couponNavPage)


  return (
    <View style={{height: height, width: width}}>

      {logIn && <LogInRequired />}

      {/* Main Header */}
      <MainHeader 
        title='Coupons'
        style={{backgroundColor: 'red', alignItems: 'center'}}
        mapButton
        onPressMapButton={() => navigation.navigate('Finder')}
        qrButton
        onPressQRButton={() => navigation.navigate('QRScan')}
      />

      {/* Sub Header */}
      <SubHeader
        search
        onPressSearch={() => (
          navigation.navigate('Search'),
          dispatch(setCategory('Coupons')),
          dispatch(setSelectedCategory(2)),
          dispatch(setResetFilter())
        )}
        topnavbutton
        topnavbuttonlists={[
          {id: 1, title: 'Merkliste', payload: 'marks'},
          {id: 2, title: 'Meine Coupons', payload: 'myCoupons'},
        ]}
      /> 
  

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {couponActivePage == 'marks' && 
        <PresentationHeader 
          title={'Merkliste'}
          // showAllButton
        />
      }

      {couponActivePage == 'myCoupons' && 
        <PresentationHeader 
          title={'Meine Coupons'}
          // showAllButton
        />
      }


      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({})