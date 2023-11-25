import React, {useState, useEffect} from 'react'
import { StyleSheet,View, Text, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native'

import { MainHeader, SubHeader, BottomTabNavigation } from '../../index/navIndex'
import CategorySelectorCarousel from '../../components/components_finder_screen/CategorySelectorCarousel'

import LocateModal from '../../components/components_locate_screen/LocateModal';
import { height } from '../../constants/size';
import FinderShopCard from '../../components/components_finder_screen/FinderShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { setHideLocateModal, setShowLocateModal } from '../../redux/slices/showModalSlice';
import ScreenOverlay from '../../components/components_universal/ScreenOverlay';


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function FinderScreen({navigation, navigation: {goBack}}) {
  const dispatch = useDispatch()
  const width = Dimensions.get('window').width;
  const list = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
  ]

  // Locate Modal ----------------------------------------------------------------------
  const showLocateModal = useSelector((state) => state.showModal.locateModal)

  const handleLocate = () => {
    showLocateModal? dispatch(setHideLocateModal()) : dispatch(setShowLocateModal())
  }
  // const [showLocateModal, setShowLocateModal] = useState(false)
  // const onCloseLocateModal = () => {
  //       setTimeout(() => {
  //           setShowLocateModal(false);
  //       }, 300) }
  // const handleLocate = () => {
  //         setShowLocateModal(true)
  //     }

  // Header Area ------------------------------------------------------------------------
  const headerArea = React.useMemo( () => (
    <>

    {/* Main Header */}
    <MainHeader 
      title='Finder'
      categorySelector
      qrButton
      onPressQRButton={() => navigation.navigate('QRScan')}
      headerContainerStyle={{backgroundColor: 'transparent'}}
    />

    {/* Sub Header */}
    <SubHeader 
      locateButton
      onPressLocate={handleLocate}
      subHeaderContainerStyle={{backgroundColor: 'transparent'}}
      goBack
      onPressGoBack={() => goBack()}
    />

    </>
  ), [])

  return (
    <View style={{flex: 1}}>

      <LocateModal />
      <ScreenOverlay locate/>

      {headerArea}

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <View style={{flex: 1}}>

      <View style={{alignItems: 'center', width: width, height: 0.22*height, position: 'absolute', bottom: 0}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', paddingHorizontal: 30}}>
          <Text style={{fontFamily: 'Roboto-Medium', fontSize: 22}}>24<Text style={{fontFamily: 'Roboto-Light', fontSize: 17}}> Shops</Text></Text>
          <TouchableOpacity><Text style={{fontFamily: 'Roboto-Medium', fontSize: 11, color: '#B84058'}}>Alle Anzeigen</Text></TouchableOpacity>
        </View>
        <View>
          <FinderShopCard />
        </View>
      </View>

      </View>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </View>
  )
}

const styles = StyleSheet.create({

})