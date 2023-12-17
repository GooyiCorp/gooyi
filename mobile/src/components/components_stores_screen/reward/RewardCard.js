import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import PointIcon from '../../components_universal/PointIcon'
import { H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import IconLabelButton from '../../components_universal/IconLabelButton'

export default function RewardCard() {
  return (
    <View style={styles.card}>

        <Icons
            icon={icons.Ionicons}
            iconName={'ios-information-circle-outline'}
            iconSize={20}
            iconColor={COLORS.grey}
            iconStyle={{
                position: 'absolute',
                top: 5,
                right: 5, 
            }}
        />


        {/* <Text style={T4}>Dat Backhus</Text> */}
        
        <View style={{flexDirection: 'row', margin: 5}}>

        <Icons
            icon={icons.MaterialCommunityIcons}
            iconName={'ticket-percent'}
            iconSize={20}
            iconColor={COLORS.grey}
        />

        <View style={{marginLeft: 10}}>
            <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>1x kostenloses Getränk</Text>
            <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>Größe M</Text>
        </View>

        </View>

        {/* <View style={{width: '100%', borderWidth: 0.5, borderColor: COLORS.ivoryDark2}}></View> */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>


            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                <Text style={[H3, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>200</Text>
                <PointIcon style={{marginLeft: 5, backgroundColor: COLORS.primary}}/>
            </View>
        


            {/* Button */}
            <View>
                <IconLabelButton 
                label={'Einlösen'}
                style={{
                    backgroundColor: COLORS.ivoryDark,
                    paddingHorizontal: 15,
                }}
                labelStyle={{
                    fontFamily: 'RH-Medium',
                    color: COLORS.grey
                }}
                />
            </View>
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: width-60,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        padding: 10,
    },

    text: {
        color: COLORS.grey,
        fontFamily: 'RH-Medium',
    }
})