import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { H2, H3, H4, T1, T2 } from '../../constants/text-style'
import Icons, { icons } from '../../components/components_universal/Icons'

export default function CouponCardDetail({
    navigation,
    navigation: {goBack}
}) {
    const handleGoBack = () => {
        goBack()
    }
    const handleShowShop = () => {
        navigation.navigate('Store', {screen: 'StoreEntry'})
    }
  return (
    <View style={styles.card}>
        {/* Header */}
            <SettingHeader
            goBack
            onPressGoBack={handleGoBack}
            header
            headerText={'Yoko Sushi'}
            iconStyle={COLORS.mainBackground}
            next
            onPressNext={handleShowShop}
        /> 
        {/* ------------------------------------------------- */}
        {/* Info Section */}
        {/* ------------------------------------------------- */}
        <View style={{paddingHorizontal: 30}}>
                    <Text style={[H3, {fontFamily: 'RH-Medium'}]}>1x Kostenloses Getränk</Text>
                    <Text style={[H4, {fontFamily: 'RH-Regular'}]}>Größe M</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            {/* <View style={{height: 40, width: 40, backgroundColor: COLORS.grey, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginRight: 10}}> */}
                {/* <Icons
                    icon={icons.MaterialCommunityIcons}
                    iconName={'ticket-percent'}
                    iconSize={28}
                    iconColor={COLORS.grey}
                    /> */}
            {/* </View> */}
            {/* Logo Box */}
            {/* <View style={styles.logoBox}>
                <Image source={require('../../../assets/image/Yoko_Logo_WEB.png')} resizeMode='contain' style={{maxWidth: '80%'}}/>
            </View>      */}

            </View>

            <View>
                </View>

        {/* Description Section ---- */}
          {/* Title */}
          {/* <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 10, marginBottom: 8}]}>Gültigkeit</Text> */}
          {/* Description */}
          <Text style={[T2, {marginTop: 10}]}>Gültig bis 30.06.2023</Text>

          {/* <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 10, marginBottom: 8}]}>Aussteller</Text> */}
          {/* Description */}
          {/* <Text style={[T2]}>Yoko Sushi - Bremen</Text> */}

          

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
    logoBox: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden'
      },
})