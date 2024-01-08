import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// Constant
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { H4, T1, T2, T3, T4 } from '../../constants/text-style'
// Components
import Keywords from '../../components/components_search_screen/Keywords'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { useSelector } from 'react-redux'
import Request from '../../helper/request.js'
import openMap from 'react-native-open-maps';
import OpeningHours from '../../components/components_universal/OpeningHours.js'
import { WebView } from 'react-native-webview';

export default function StoreInformation({
    route,
    navigation: {goBack}
}) {

    const {store_id} = route.params
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [opening, setOpening] = useState(false)
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [hours, setHours] = useState({})
    const [services, setServices] = useState([])
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const accessToken = useSelector(state => state.user.accessToken);

    const getStoreInfo = async () => {
        const response = isLoggedIn ? await Request(`user/store/loggedin/info/${store_id}`, "GET", null, accessToken) : await Request(`user/store/info/${store_id}`, "GET", null)
        if (response.success) {
            setName(response.data.name)
            setAddress(response.data.Address.street + ", " + response.data.Address.postcode + " " + response.data.Address.city)
            setOpening(response.data.is_opening)
            setLongitude(response.data.location.longitude)
            setLatitude(response.data.location.latitude)
            setHours(response.data.OpeningHour)
            setServices(response.data.service);
        }
    }
    // Set User Point 
    useEffect(() => {
        getStoreInfo();
    }, [])



  return (
    <View style={styles.card}>
        {/* Header */}
        <SettingHeader
            goBack
            onPressGoBack={() => goBack()}
            header
            headerText={name}
            iconStyle={COLORS.mainBackground}
        />
        {/* Info Section  */}
        <View style={{paddingHorizontal: 30}}>
            {/* Address ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8}]}>Standort</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* Address */}
                <Text style={T2}>{address}</Text>
                {/* Map Button */}
                <TouchableOpacity style={styles.buttonStyle} onPress={() => openMap({longitude, latitude, query: name, zoom: 20})}>
                    <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Karte öffnen</Text>
                </TouchableOpacity>
            </View>
            {/* Opening Hours ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Öffnungszeiten</Text>
            {/* current opening state */}
            <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
                <View style={{height: 10, width: 10, borderRadius: 10, backgroundColor: opening ? COLORS.green : COLORS.grey, marginRight: 10}}></View>
                <Text style={[T3, {textTransform: 'uppercase', fontFamily: 'RH-Bold', color: COLORS.grey}]}>{opening ? 'geöffnet' : 'closed'}</Text>
            </View>
            {/* Opening Hours */}
            <OpeningHours hours={hours}/>
            {/* Service Information ----------------------- */}
            {/* Title */}
            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Service</Text>
            {/* .map Services */}
            <View style={{marginHorizontal: -5,flexWrap: 'wrap', flexDirection: 'row'}}>
                {services.map(service => <Keywords key={service.service_id} keyword={service.name} />)}
            </View>
        </View>
        {/* Map Section */}
        {/* <WebView style={styles.map}
            source={{ html: `<iframe style="border-radius:20" width="200%" height="200%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%&amp;hl=en&amp;q=${latitude},%20${longitude}+(%20%20)&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>`}}
        /> */}
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