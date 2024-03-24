import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import Icons, { icons } from '../universal/Icons/Icons'
import { T1, T3, T4, T5 } from '../../helper/constants/text'
import StatusBadge from '../universal/Badge/StatusBadge'

export default function CouponBigCard({type}) {
  return (
    <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }}>
    
    <View 
        style={{
            width: '100%',
            // height: 125,
            borderWidth: 0.5,
            borderColor: COLORS.grey,
            borderRadius: 16,
            paddingHorizontal: 15,
            paddingVertical: 10
        }}
    >
        <View 
            style={{
                width: 30, 
                height: 30,
                backgroundColor: 
                    type == 'coupon' ? '#DD758A' :
                    type == 'reward' ? '#758CDD' : 
                    type == 'deal' ? '#4FAAA0' :
                    type == 'quest' ? '#FCDA70' : '#fff',
                borderRadius: 9,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 10,
                right: 10
            }}
        >
            <Icons 
                icon={type == 'quest'? icons.AntDesign : icons.MaterialCommunityIcons}
                iconName={
                    type == 'coupon'? 'ticket-percent' :
                    type == 'reward'? 'gift' : 
                    type == 'deal'? 'percent' :
                    type == 'quest'? 'star' : ''
                }
                iconSize={20}
                iconColor={
                    type == 'coupon'? '#F5E1E1' :
                    type == 'reward'? '#E2E8FD' : 
                    type == 'deal'? '#D6F4F1' :
                    type == 'quest'? '#FFF3CF' : '#fff'
                }
            />
        </View>
        <Text style={[T1, {fontFamily: 'RH-Bold'}]}>20% auf alle vegane Gerichte</Text>
        <View style={{marginTop: 6}}>
            <Text style={[T3, {marginTop: 5}]}>Cap: 560 / 700</Text>
            <Text style={[T3, {marginTop: 5}]}>Eingelöst: 420</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
            <StatusBadge 
                status={'Aktiv'}
                styleContainer={{
                    marginBottom: 6,
                    right: -2,
                    alignSelf: 'flex-end'
                }}
            />
            <Text style={T4}>Gestartet am 30.02.2024</Text>

        </View>
    </View>
    
    <Icons 
        icon={icons.MaterialIcons}
        iconName={'navigate-next'}
        iconSize={22}
        iconColor={COLORS.grey}
    />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})