import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { T1, T2, T3 } from '../../helper/constants/text'
import ClassBadge from '../universal/Badge/ClassBadge'
import { COLORS } from '../../helper/constants/colors'
import Icons, { icons } from '../universal/Icons/Icons'

export default function TeamCard({
    name,
    email,
    type,
    onPress,
}) {
  return (
    <TouchableOpacity 
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.grey,
            paddingVertical: 15,
            marginBottom: 10
        }}
        onPress={onPress}
    >
        <View>
            <Text style={[T1, {fontFamily: 'RH-Bold'}]}>{name}</Text>
            <Text style={[T2]}>{email}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>

            <ClassBadge 
                type={type}
                styleContainer={{
                    alignSelf: 'center'
                }}
            />
            <Icons 
                icon={icons.MaterialIcons}
                iconName={'navigate-next'}
                iconSize={22}
                iconColor={COLORS.grey}
                iconStyle={{
                    marginRight: -8,
                    marginLeft: 10
                }}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})