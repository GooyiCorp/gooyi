import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import PointIcon from '../../components_universal/PointIcon'
import { H3, H4, T1 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'

export default function RewardCard() {
  return (
    <View style={styles.card}>
        {/* <View style={{height: 40, width: 40, backgroundColor: COLORS.ivoryDark2, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'ticket-percent'}
                iconSize={28}
                iconColor={COLORS.ivoryDark}
            />
        </View> */}
      <Text>Kostenloses Getränk Size M</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <PointIcon style={{marginRight: 5}}/>
      <Text style={[H3, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>200</Text>
      </View>
      <View style={{backgroundColor: COLORS.primary, alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10}}>

        <Text style={[T1, {color: COLORS.white}]}>Einlösen</Text>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: width-60,
        marginHorizontal: 30,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        padding: 10,
    }
})