import { Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import BigButton from '../../components/components_LogIn/BigButton'
import { H2, H3, H4, T1, T2, T4 } from '../../constants/text-style'
import Icons, { icons } from '../../components/components_universal/Icons'
import RoundButton from '../../components/components_universal/RoundButton'
import OrderOverviewModal from '../../components/components_discover_screen/Payment/OrderOverviewModal'
import { useDispatch } from 'react-redux'
import { setShowOrderOverviewModal } from '../../redux/slices/showModalSlice'
import ScreenOverlay from '../../components/components_universal/ScreenOverlay'
import IconLabelButton from '../../components/components_universal/IconLabelButton'


// ----------------------------------------------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------------------------------------------
export default function GiftMessage({
    navigation,
    navigation: {goBack}
}) {

// Redux
const dispatch = useDispatch()

    // Input State
    const [message, setMessage] = useState('')
    const [showInput, setShowInput] = useState(true)

    // ---- Go Back Handler
    const handleGoBack = () => {
        // goBack()
        navigation.navigate('OfferCardDetail')
    }

    // Input Clear Button
    const handleClearButton = () => {
        setMessage('')
        // setShowInput(false)
        Keyboard.dismiss()
    } 

    const handlePayment = () => {
        dispatch(setShowOrderOverviewModal())
    }

// ----------------------------------------------------------------------------------------------------------------
// RETURN
// ----------------------------------------------------------------------------------------------------------------
return (
<View style={styles.card}>
    <OrderOverviewModal />
    <ScreenOverlay orderOverview delay={0}/>
    {/* Background Touch */}
    <Pressable 
      style={{
        height: height, 
        width: width, 
      }} 
      onPress={() => Keyboard.dismiss()} 
    >
    {/* Header */}
    <SettingHeader
        goBack
        onPressGoBack={handleGoBack}
        header
        headerText={'Überblick'}
        iconStyle={COLORS.mainBackground}
    />
    {/* ------------------------------------------------------------------------------- Main Section */}
    <View style={{paddingHorizontal: 30}}>
        {/* Gift Overview */}
        <View style={styles.messageContainer}>
            {/* Gift Icon */}
            <View style={{position: 'absolute', right: 20, top: 20}}>
                <Icons 
                    icon={icons.MaterialCommunityIcons}
                    iconName={'gift'}
                    iconSize={19}
                    iconColor={COLORS.grey}
                />
            </View>
            {/* Receiver Information */}
            <View style={{alignItems: 'center', marginBottom: 20}}>
            <View style={{height: 120, width: 120, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require('../../../assets/image/GiftBox.png')}
                    resizeMode='contain'
                    style={{maxWidth: '100%'}}
                />
            </View>
                <Text style={[H3, {fontFamily: 'RH-Medium'}]}>Sebastian Davis</Text>
                <Text style={[T2, {color: COLORS.grey, fontFamily: 'RH-Regular'}]}>sebastian.122@gmail.com</Text>
            </View>
            {/* Gift Information */}
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                {/* Amount */}
                {/* <Text style={[T1, {marginRight: 10}]}>1x</Text> */}
                {/* Information */}
                <View>
                    <Text style={[T1, {fontFamily: 'RH-Bold'}]}>Udon Set für 2 Personen</Text>
                    <Text style={T4}>Noosou Asia Kitchen</Text>
                </View>
            </View>
            {/* {!showInput && <IconLabelButton
                label={'Nachricht hinzufügen'}
                icon={icons.MaterialCommunityIcons}
                iconName={'email'}
                iconSize={20}
                iconColor={COLORS.grey}
                style={{
                    backgroundColor: COLORS.ivory,
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 15,
                    borderRadius: 16,
                    marginVertical: 20
                }}
                labelStyle={{
                    marginLeft: 2,
                    color: COLORS.grey,
                    fontFamily: 'RH-Medium'
                }}
                onPressButton={() => setShowInput(true)}
            />} */}
            {/* ---- start - Input Section */}
            {/* ------------------------------------------------ */}
            {/* Input Box */}
            {/* ------------------------------------------------ */}
            {/* {showInput && 
            <> */}
            {/* Clear Button */}
            <RoundButton
                icon={icons.Ionicons}
                iconName={'close'}
                iconSize={30}
                iconColor={COLORS.grey}
                style={{
                    backgroundColor: COLORS.ivoryDark2,
                    margin: 0,
                    marginRight: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    height: 34,
                    width: 34,
                    alignSelf: 'flex-end'
                }}
                onPressButton={handleClearButton}
            />
            <View style={[styles.inputContainer]}>
                {/* Input */}
                <TextInput 
                    value={message}
                    onChangeText={(e) => setMessage(e)}

                    placeholder='Deine Nachricht'
                    placeholderTextColor={COLORS.grey}

                    multiline={true}
                    maxLength={200}
                    numberOfLines={3}

                    style={{
                        flex: 1,
                        fontFamily: 'RH-Regular',
                        fontSize: 15,
                        paddingHorizontal: 15,
                    }}
                />
            </View>
            {/* Max Input Count */}
            <Text style={[T4, {marginRight: 10, marginTop: 5, alignSelf: 'flex-end'}]}>{message.length}/200</Text>
            {/* </>
            } */}
            {/* ---- end - Input Section */}    
                        
            <Text style={[T2, {marginHorizontal: 10}]}>Gültig bis 30.06.2023</Text>
        
        </View>

        <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginBottom: 8, marginTop: 20}]}>Informationen</Text>
        <Text style={T2}>Der Empfänger wird bei Zahlungsabschluss benachrichtigt und hat 30 Tage Zeit das Geschenk anzunehmen.</Text>
        <Text style={[T2, {marginTop: 10}]}>Sollte der Empfänger innerhalb dieser Zeitraum das Geschenk nicht annehmen geht der Gutschein zurück an den Absender!</Text>
        {/* <Text style={[T2, {marginTop: 20}]}>Weitere Informationen zum Thema Verschenken findest du <Text style={{fontFamily: 'RH-Medium', color: COLORS.primary}}>hier</Text>.</Text> */}
    </View>

    <BigButton 
        title={'Weiter zur Zahlung'}
        bgStyle={{
            backgroundColor: COLORS.primary,
            position: 'absolute',
            zIndex: 2,
            bottom: 30,
        }}
        titleStyle={{
            color: COLORS.white
        }}
        onPress={handlePayment}
    />  
    </Pressable>
</View>
)
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground
    },
    messageContainer: {
        width: '100%',
        backgroundColor: COLORS.ivoryDark,
        borderRadius: 20,
        // alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 10,
        overflow: 'hidden',
        // marginTop: 30
    },
    inputContainer: {
        height: 100,
        width: '100%',
        backgroundColor: COLORS.mainBackground,
        borderRadius: 10,
        paddingVertical: 5,
        // marginVertical: 30,
    }
})