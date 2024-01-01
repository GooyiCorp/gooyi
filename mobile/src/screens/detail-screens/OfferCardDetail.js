import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H1, H2, H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import EndInTimer from '../../components/components_universal/EndInTimer'
import DiscountBanner from '../../components/components_discover_screen/OfferCard/DiscountBanner'
import HeartButton from '../../components/components_universal/HeartButton'
import { icons } from '../../components/components_universal/Icons'
import BulletPointText from '../../components/components_universal/BulletPointText'
import IconLabelButton from '../../components/components_universal/IconLabelButton'
import OrderOverviewModal from '../../components/components_discover_screen/Payment/OrderOverviewModal'
import { useDispatch } from 'react-redux'
import { setShowOrderOverviewModal } from '../../redux/slices/showModalSlice'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'


export default function OfferCardDetail({
  navigation,
  navigation: {goBack},
}) {
// Redux
const dispatch = useDispatch()

  const price = 23.99
  const discountPrice = 19.99


  // Hanlde Show Shop
  const handleShowShop = () => {
    navigation.navigate('Store', {screen: 'StoreEntry'})
  }
  // Go Back Button Handler
  const handleGoBack = () => {
    goBack()
  }

  const handleShowOrderOverview = () => {
    dispatch(setShowOrderOverviewModal())
  }

  const handleSendAsGift = () => {
    navigation.navigate('SendAsGift')
  }

  return (
    <View style={styles.card}>

      <OrderOverviewModal />
      <ScreenOverlay orderOverview delay={0}/>

      {/* Header */}
      <SettingHeader
        goBack
        onPressGoBack={handleGoBack}
        header
        headerText={'Nousou Asia Kitchen'}
        iconStyle={COLORS.mainBackground}
        next
        onPressNext={handleShowShop}
      />   
      {/* Image Box */}
      <View style={styles.imageBox}>
        {/* Heart Button */}
        <View style={{height: 35, width: 35, position: 'absolute', bottom: 10, right: 10}}>
          <HeartButton 
            icon={icons.MaterialIcons}
            iconName={'favorite'}
            iconSize={35}
          />
        </View>
      </View>
      {/* ------------------------------------------------- */}
      {/* Info Section */}
      {/* ------------------------------------------------- */}
      <View style={{paddingHorizontal: 30, marginTop: 30}}>
        {/* Title */}
        <Text style={[H3, {fontFamily: 'RH-Medium', marginBottom: 8}]}>Udon Set für 2 Personen</Text>
        {/* Description Section ---- */}
          {/* Title */}
          <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 10, marginBottom: 8}]}>Inhalt</Text>
          {/* Description */}
          <Text style={[T2]}>2x Udon Bowl {"\n"}2x Getränk 500ml</Text>
        {/* Price Section ---------- */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          {/* Price */}
          <Text style={[H3, {paddingRight: 10, textDecorationLine: 'line-through', textDecorationColor: COLORS.primary, color: COLORS.grey}]}>{price}</Text>
          {/* Discount Price */}
          <Text style={[H3, {fontFamily: 'RH-Bold', color: COLORS.primary, marginRight: 20}]}>{discountPrice} €</Text>
          {/* Discount Banner */}
          <DiscountBanner 
            price={price}
            discountPrice={discountPrice}
          />
        </View>
        {/* Countdown -------------- */}
        <EndInTimer />
        {/* Condition Section ------ */}
        <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 20, marginBottom: 8}]}>Konditionen</Text>
        <BulletPointText text={'4 Monate ab Kauf gültig'}/>
        <BulletPointText text={'1x pro Person einlösbar'}/>
        <Text style={[T2, {marginTop: 20}]}>Dieses Angebot ist nicht mit anderen Aktionen oder Rabatten kombinierbar</Text>

      </View>

      {/* ------------------------------------------------- */}
      {/* Button Section */}
      {/* ------------------------------------------------- */}
      <View style={{position: 'absolute', zIndex: 2, bottom: 30, alignItems: 'center', justifyContent: 'space-between', width: width, paddingHorizontal: 30, flexDirection: 'row'}}>
        {/* As Gift Button */}
        <IconLabelButton
          label={'Verschenken'}
          icon={icons.MaterialCommunityIcons}
          iconName={'gift'}
          iconSize={19}
          iconColor={COLORS.grey}
          style={{
              backgroundColor: COLORS.ivoryDark,
              height: 50,
              width: width*0.45-35,
              paddingHorizontal: 15,
              borderRadius: 16,
              alignSelf: 'flex-end',
              marginVertical: 5,
              justifyContent: 'center'
          }}
          labelStyle={{
              marginLeft: 2,
              color: COLORS.grey,
              fontFamily: 'RH-Medium'
          }}
          innerContainerStyle={{
              alignItems: 'baseline'
          }}
          onPressButton={handleSendAsGift}
        />
        {/* Buy Button */}
        <IconLabelButton
          label={'Zur Kasse'}
          style={{
              backgroundColor: COLORS.primary,
              height: 50,
              width: width*0.55-35,
              paddingHorizontal: 15,
              borderRadius: 16,
              alignSelf: 'flex-end',
              marginVertical: 5,
              justifyContent: 'center'
          }}
          labelStyle={{
              marginLeft: 2,
              color: COLORS.mainBackground,
              fontFamily: 'RH-Medium'
          }}
          innerContainerStyle={{
              alignItems: 'baseline'
          }}
          onPressButton={handleShowOrderOverview}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground
    },
    imageBox: {
        height: 0.25*height,
        width: width-60,
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 16,
        marginHorizontal: 30
    }
})