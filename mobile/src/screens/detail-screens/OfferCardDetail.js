import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import { H1, H2, H3, H4, T1, T2, T3, T4 } from '../../constants/text-style'
import BigButton from '../../components/components_LogIn/BigButton'
import EndInTimer from '../../components/components_universal/EndInTimer'

export default function OfferCardDetail() {
  return (
    <View style={styles.card}>
      {/* Header Back Button */}
      <SettingHeader
        goBack
        // onPressGoBack={handleGoBack}
        header
        headerText={'Vorschau'}
        iconStyle={COLORS.mainBackground}
        heartButton
      />   
        <View style={styles.imageBox}></View>
        <View style={{paddingHorizontal: 30, marginTop: 30}}>

          <Text style={[H3, {fontFamily: 'RH-Medium'}]}>Udon Set für 2 Personen</Text>
          <Text style={T2}>Noosou Asia Kitchen</Text>

          <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 10}]}>Inhalt</Text>
            <Text style={[T2, {marginBottom: 10}]}>2x Udon Bowl {"\n"}2x Getränk 500ml</Text>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[H3, {paddingRight: 10, textDecorationLine: 'line-through', textDecorationColor: COLORS.primary, color: COLORS.grey}]}>23,99</Text>
              <Text style={[H3, {fontFamily: 'RH-Bold', color: COLORS.primary}]}>19,99</Text>
            <EndInTimer />
            </View>


            <Text style={[H4, {fontFamily: 'RH-Medium', color: COLORS.black, marginTop: 10}]}>Konditionen</Text>
            <Text style={T2}>4 Monate ab Kauf gültig. {"\n"}Limitiert (1 Gutschein pro Person einlösbar)</Text>
            <Text style={[T2, {marginTop: 10}]}>Dieses Angebot ist nicht mit anderen Aktionen oder Rabatten kombinierbar</Text>

        </View>


        <View style={{position: 'absolute', zIndex: 2, bottom: 30, alignItems: 'center', justifyContent: 'space-between', width: width, paddingHorizontal: 30, flexDirection: 'row'}}>
        <BigButton
            title={'Verschenken'}
            bgStyle={{
                width: width/2-35,
                backgroundColor: COLORS.ivoryDark,
            }}
            titleStyle={{
                color: COLORS.grey
            }}
        />

        <BigButton
            title={'Kaufen'}
            bgStyle={{
                width: width/2-35,
                backgroundColor: COLORS.primary,
            }}
            titleStyle={{
                color: COLORS.white
            }}
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