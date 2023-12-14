import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import Filter from '../../../components/components_search_screen/Filter'
import Keywords from '../../../components/components_search_screen/Keywords'

export default function StoreInformation({
    navigation: {goBack}
}) {
  return (
    <View style={styles.card}>
        {/* Header Back Button */}
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={'Dat Backhus'}
            iconStyle={COLORS.mainBackground}
        />
        <View style={{paddingHorizontal: 30}}>
            {/* <Text style={T2}>Dat Backhus ist eine Hamburger Traditionsbäckerei und setzt sich seit 80 Jahren leidenschaftlich für die klassischen Werte des Bäckerhandwerks ein.</Text> */}
            <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginBottom: 5}]}>Standort</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={T2}>Bahnhofsplatz 42 {"\n"}22195 Bremen</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('open Map App')}>
                    <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Karte öffnen</Text>
                </TouchableOpacity>
            </View>
            <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginBottom: 5, marginTop: 20}]}>Öffnungszeiten</Text>
            <View style={{flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>
                <View style={{height: 10, width: 10, borderRadius: 10, backgroundColor: COLORS.green, marginRight: 10}}></View>
                <Text style={[T3, {textTransform: 'uppercase', fontFamily: 'RH-Bold', color: COLORS.grey}]}>geöffnet</Text>
            </View>
            <Text style={T2}>Montag - Freitag: 07:00 – 17:00 Uhr {"\n"}Samstag: 07:00 – 14:00 Uhr{"\n"}Sonntag: 08:00 – 12:00 Uhr</Text>
            <Text style={[H4, {fontFamily: 'RH-Regular', color: COLORS.grey, marginBottom: 5, marginTop: 20}]}>Service</Text>
            <View style={{marginHorizontal: -5,flexWrap: 'wrap', flexDirection: 'row'}}>
                <Keywords keyword={'Kartenzahlung'}/>
                <Keywords keyword={'Lieferservice'}/>
                <Keywords keyword={'To Go'}/>
                <Keywords keyword={'Wifi'}/>
                <Keywords keyword={'Außensitzplätze'}/>
            </View>
        </View>

        <View style={styles.map}>

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
        borderRadius: 20
    }
})