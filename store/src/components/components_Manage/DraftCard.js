import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { T1 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'
import { COLORS } from '../../helper/constants/colors'

export default function DraftCard() {
  return (
    <View 
        style={{
            width: 280,
            height: 100,
            borderWidth: 0.5,
            borderRadius: 16,
            paddingLeft: 15,
            paddingRight: 45,
            paddingVertical: 10,
        }}
    >
      <Text style={[T1, {fontFamily: 'RH-Bold'}]}>20% auf alle vegane Gerichte</Text>
      <View style={{width: 30, height: 30, backgroundColor: '#DD758A', borderRadius: 10, position: 'absolute', right: 10, top: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Icons 
                icon={icons.MaterialCommunityIcons}
                iconName={'ticket-percent'
                }
                iconSize={19}
                iconColor={'#F5E1E1'
                }
            />
      </View>
      <Icons
            icon={icons.MaterialCommunityIcons}
            iconName={'square-edit-outline'}
            iconSize={25}
            iconColor={COLORS.grey}
            iconStyle={{
                position: 'absolute',
                bottom: 10,
                right: 10,
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})