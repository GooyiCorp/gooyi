import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import RoundButton from '../components_universal/RoundButton'

export default function StatisticBox() {
  return (
    <View style={styles.boxContainer}>
      <Text style={{fontFamily: 'RH-Bold', fontSize: 18}}>Übersicht</Text>

      <View style={styles.statsContainer}>

        <Text style={{fontFamily: 'RH-Bold', fontSize: 14}}>Nutzer ID</Text>
      <Text>01233.2233.112</Text>

</View>
        
      <View style={{width: '100%', backgroundColor: COLORS.borderGrey, height:0.2, marginTop: 15}}></View>

          {/* <View style={{width: 1, height: 70, backgroundColor: 'black'}}></View> */}
      <View style={styles.statsContainer}>

      
      <Text style={{fontFamily: 'RH-Bold', fontSize: 14}}>Coupons</Text>
        <View style={styles.statsView}>
            <Text style={{fontFamily: 'RH-Bold', fontSize: 30}}>15</Text>
            <Text style={{fontFamily: 'RH-Regular', fontSize: 12}}>Nicht eingelöst</Text>
        </View>
        <View style={styles.statsView}>
            <Text style={{fontFamily: 'RH-Bold', fontSize: 30}}>5</Text>
            <Text style={{fontFamily: 'RH-Regular', fontSize: 12}}>Läuft bald ab</Text>
        </View>
      </View>
      {/* <View style={{width: '100%', backgroundColor: COLORS.borderGrey, height:0.5, marginTop: 15}}></View> */}
      
              <RoundButton
            icon={icons.Ionicons}
            iconName={'settings-sharp'}
            iconSize={20}
            iconColor={COLORS.white}
            style={{
                height: 38,
                width: 38,
                borderRadius: 10,
                marginTop: 20,
                marginHorizontal: 0,
                backgroundColor: COLORS.borderGrey
            }}
        />

<Text style={{fontFamily: 'RH-Bold', fontSize: 18, marginTop: 30}}>Letzte Aktivitäten</Text>

<View>
    
</View>
<View style={{width: width-60, backgroundColor: 'white', alignItems:'center', flexDirection: 'row', paddingHorizontal: 10,paddingVertical:10, marginTop: 10, borderRadius: 16}}>
    <View style={{height: 50, width: 50, backgroundColor: 'grey', marginRight: 20, borderRadius: 10}}></View>
    <View>

        <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Noosou Asia Kitchen</Text>
        <Text style={{fontFamily: 'RH-Bold', fontSize: 18}}>+ 150 <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Punkte</Text></Text>
    </View>
    <Text style={{position: 'absolute', bottom: 10, right: 10, fontFamily: 'RH-Regular', fontSize: 10}}>vor 5 min</Text>
</View>

<View style={{width: width-60, backgroundColor: 'white', alignItems:'center', flexDirection: 'row', paddingHorizontal: 10,paddingVertical:10, marginTop: 10, borderRadius: 16}}>
    <View style={{height: 50, width: 50, backgroundColor: 'grey', marginRight: 20, borderRadius: 10}}></View>
    <View>

        <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Noosou Asia Kitchen</Text>
        <Text style={{fontFamily: 'RH-Bold', fontSize: 18}}>+ 150 <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Punkte</Text></Text>
    </View>
    <Text style={{position: 'absolute', bottom: 10, right: 10, fontFamily: 'RH-Regular', fontSize: 10}}>vor 5 min</Text>
</View>

<View style={{width: width-60, backgroundColor: 'white', alignItems:'center', flexDirection: 'row', paddingHorizontal: 10,paddingVertical:10, marginTop: 10, borderRadius: 16}}>
    <View style={{height: 50, width: 50, backgroundColor: 'grey', marginRight: 20, borderRadius: 10}}></View>
    <View>

        <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Noosou Asia Kitchen</Text>
        <Text style={{fontFamily: 'RH-Bold', fontSize: 18}}>+ 150 <Text style={{fontFamily: 'RH-Regular', fontSize: 14}}>Punkte</Text></Text>
    </View>
    <Text style={{position: 'absolute', bottom: 10, right: 10, fontFamily: 'RH-Regular', fontSize: 10}}>vor 5 min</Text>
</View>



    </View>

  )
}

const styles = StyleSheet.create({
    boxContainer: {
        width: width-60,
        //height: 150,
        borderRadius: 16,
        backgroundColor: COLORS.mainBackground,
        marginTop: 20,
        //padding: 15,
    },

    imgContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statsContainer: {
        width: width-60,
        borderRadius: 16,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statsView: {
        justifyContent: 'center',
        // alignItems: 'center'
        //backgroundColor: 'yellow'
    }

})