import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T1, T2 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'
import { useNavigation } from '@react-navigation/native'

export default function SectionCard({
    type,
    route,
}) {
    const navigation = useNavigation()
  return (
    <TouchableOpacity 
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
        onPress={() => navigation.navigate(route)}
    >
        <View 
            style={{
                width: 34, 
                height: 34,
                backgroundColor: 
                    type == 'coupon' ? '#DD758A' :
                    type == 'reward' ? '#758CDD' : 
                    type == 'deal' ? '#4FAAA0' :
                    type == 'quest' ? '#FCDA70' : '#fff',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5
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
                iconSize={22}
                iconColor={
                    type == 'coupon'? '#F5E1E1' :
                    type == 'reward'? '#E2E8FD' : 
                    type == 'deal'? '#D6F4F1' :
                    type == 'quest'? '#FFF3CF' : '#fff'
                }
            />
        </View>
        <Text style={[T1, {fontFamily: 'RH-Bold', marginTop: 10}]}>
            {
                type == 'coupon'? 'Coupons' :
                type == 'reward'? 'Prämien' :
                type == 'deal'? 'Deals' : 
                type == 'quest'? 'Quest' : ''
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})