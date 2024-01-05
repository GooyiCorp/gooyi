import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H4, T1, T2, T3, T4 } from '../../constants/text-style'
// Components
import Keywords from '../../components/components_search_screen/Keywords'
import SettingHeader from '../../components/components_navigation/SettingHeader'

export default function StoreInformation({
    route,
    navigation: {goBack}
}) {

    const {store_id} = route.params
    console.log(store_id)
  return (
    <View style={styles.card}>
        {/* Header */}
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Dat Backhus'}
            iconStyle={COLORS.mainBackground}
        />
        {/* Info Section  */}
        <View style={{paddingHorizontal: 30}}>
            {/* Address ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8}]}>Standort</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* Address */}
                <Text style={T2}>Bahnhofsplatz 42 {"\n"}22195 Bremen</Text>
                {/* Map Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('open Map App')}>
                    <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Karte öffnen</Text>
                </TouchableOpacity>
            </View>
            {/* Opening Hours ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Öffnungszeiten</Text>
            {/* current opening state */}
            <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
                <View style={{height: 10, width: 10, borderRadius: 10, backgroundColor: COLORS.green, marginRight: 10}}></View>
                <Text style={[T3, {textTransform: 'uppercase', fontFamily: 'RH-Bold', color: COLORS.grey}]}>geöffnet</Text>
            </View>
            {/* Opening Hours */}
            <Text style={T2}>Montag - Freitag: 07:00 – 17:00 Uhr {"\n"}Samstag: 07:00 – 14:00 Uhr{"\n"}Sonntag: 08:00 – 12:00 Uhr</Text>
            {/* Service Information ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Service</Text>
            {/* .map Services */}
            <View style={{marginHorizontal: -5,flexWrap: 'wrap', flexDirection: 'row'}}>
                <Keywords keyword={'Kartenzahlung'}/>
                <Keywords keyword={'Lieferservice'}/>
                <Keywords keyword={'To Go'}/>
                <Keywords keyword={'Wifi'}/>
                <Keywords keyword={'Außensitzplätze'}/>
            </View>
        </View>
        {/* Map Section */}
        <View style={styles.map}>
            <Text style={T4}>Show Store Position</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },

    map: {
        height: 250,
        width: width-60,
        backgroundColor: COLORS.ivoryDark,
        position: 'absolute',
        bottom: 30,
        marginHorizontal: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})