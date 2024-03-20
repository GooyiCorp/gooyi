import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T1, T2 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'

export default function SectionCard({
    coupon,
    reward,
    deal,
    quest,
}) {
  return (
    <View 
        style={{
            width: width/2-25,
            height: 100,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}
    >
        <View 
            style={{
                width: 34, 
                height: 34,
                backgroundColor: 
                    coupon? '#DD758A' :
                    reward? '#758CDD' : 
                    deal? '#4FAAA0' :
                    quest? '#FCDA70' : '#fff',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5
            }}
        >
            <Icons 
                icon={quest? icons.AntDesign : icons.MaterialCommunityIcons}
                iconName={
                    coupon? 'ticket-percent' :
                    reward? 'gift' : 
                    deal? 'percent' :
                    quest? 'star' : ''
                }
                iconSize={22}
                iconColor={
                    coupon? '#F5E1E1' :
                    reward? '#E2E8FD' : 
                    deal? '#D6F4F1' :
                    quest? '#FFF3CF' : '#fff'
                }
            />
        </View>
        <Text style={[T1, {fontFamily: 'RH-Bold', marginTop: 10}]}>
            {
                coupon? 'Coupons' :
                reward? 'Prämien' :
                deal? 'Deals' : 
                quest? 'Quest' : ''
            }
        </Text>

        <Icons
            icon={icons.MaterialCommunityIcons}
            iconName={'open-in-new'}
            iconSize={24}
            iconColor={COLORS.grey}
            iconStyle={{
                position: 'absolute',
                top: 10,
                right: 10,
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})