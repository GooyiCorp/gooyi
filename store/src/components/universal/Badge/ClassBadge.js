import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import { T3 } from '../../../helper/constants/text'

export default function ClassBadge({
    type
}) {
  return (
    <View 
        style={{
            backgroundColor: 
                type == 'Moderator' ? '#758CDD' :
                type == 'Admin' ? '#DD758A' : COLORS.lightGrey,
            alignSelf: 'flex-start', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: height,
        }}
    >
        <Text 
            style={[
                T3, 
                {
                    color: COLORS.white, 
                    fontFamily: 'RH-Medium'
                }
            ]}
        >
            {type}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({})