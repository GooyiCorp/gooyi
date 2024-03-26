import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../Icons/Icons'

export default function SectionBadge({
    type,
    containerStyle
}) {
  return (
    <View 
        style={[
            {
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
            },
            containerStyle
        ]}
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
  )
}

const styles = StyleSheet.create({})