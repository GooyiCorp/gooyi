import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Components
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { H2, H3, H4, T1, T2, T3 } from '../../constants/text-style'
import Icons, { icons } from '../../components/components_universal/Icons'

import  {default as QR} from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux'
import { setPage } from '../../redux/slices/mainNavSlice'
import BulletPointText from '../../components/components_universal/BulletPointText'
import { ScrollView } from 'react-native-gesture-handler'

export default function CouponCardDetail({
    navigation,
    navigation: {goBack}
}) {
    const dispatch = useDispatch()
    const handleGoBack = () => {
        goBack()
    }
    const handleShowShop = () => {
        navigation.navigate('Main')
        dispatch(setPage('coupons'))
    }
  return (
    <View style={styles.card}>
        {/* Header */}
            <SettingHeader
            goBack
            onPressGoBack={handleGoBack}
            header
            headerText={'Coupon'}
            iconStyle={COLORS.mainBackground}
            next
            onPressNext={handleShowShop}
        /> 
        {/* ------------------------------------------------- */}
        {/* Info Section */}
        {/* ------------------------------------------------- */}
        <ScrollView>
        <View style={{paddingHorizontal: 30, paddingBottom: 50}}>
                    {/* QR Code */}
        <View style={[styles.qrCodeContainer]}>  
            <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[T1, { marginBottom: 5}]}>Yoko Sushi</Text>
                    <Icons
                        icon={icons.MaterialCommunityIcons}
                        iconName={'ticket-percent'}
                        iconSize={22}
                        iconColor={COLORS.grey}
                        iconStyle={{
                            marginRight: -2
                        }}
                    />

                </View>
                <Text style={[H4, {fontFamily: 'RH-Bold'}]}>1x Kostenloses Getränk</Text>
                    <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>Größe M</Text>
            </View>
            <View style={{marginVertical: 30}}>
                <View style={{padding: 20, backgroundColor: COLORS.mainBackground, borderRadius: 20}}>
                    <QR
                        value={'fdskfkasjdgkjs'}
                        size={250}
                        color="black"
                        backgroundColor={COLORS.mainBackground}
                    />
                </View>
                <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.black, alignSelf: 'center', marginTop: 10}]}><Text style={{fontFamily: 'RH-Bold'}}>Coupon ID:</Text> YS23-0021-7798</Text>
            </View>        
            <View style={{width: '100%'}}>
            <Text style={[T2]}>Gültig bis einschließlich den 30.06.2023</Text>

            </View>
        </View>

        <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Informationen</Text>
        <Text style={T2}>Dieser Coupon wird von <Text style={{fontFamily: 'RH-Bold'}}>Yoko Sushi Bremen</Text> bereitgestellt!</Text>
        {/* Label */}
        <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Standort</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* Address */}
                <Text style={T2}>Bahnhofsplatz 42 {"\n"}22195 Bremen</Text>
                {/* Map Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('open Map App')}>
                    <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Karte öffnen</Text>
                </TouchableOpacity>
        </View>

                {/* Condition Section ------ */}
                <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 20, marginBottom: 8}]}>Konditionen</Text>
        <BulletPointText text={'Kann nicht ausgezahlt werden.'}/>
        <BulletPointText text={'Nur einlösbar solange das Artikel verfügbar ist.'}/>
        <BulletPointText text={'Vom Umtausch und Rückgabe ausgeschlossen!'}/>
        <Text style={[T2, {marginTop: 20}]}>Informiere dich bitte vorher über die <Text style={{fontFamily: 'RH-Medium', color: COLORS.primary}}>Teilnahmebedingungen</Text>.</Text>


          
        </View>
        </ScrollView>
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
      qrCodeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        // height: width,
        width: width-60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 20,
        alignSelf: 'center',

      },

})