import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons, { icons } from '../Icons/Icons'
import { COLORS } from '../../../helper/constants/colors'
import { T1, T3 } from '../../../helper/constants/text'

export default function ServicesButton({
    title,
    icon,
    iconName,
    iconColor,
    iconSize,
}) {
  return (
    <View 
        style={{
            width: '100%',
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 5
        }}
    >
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <View style={{
                width: 30,
                height: 30,
                // backgroundColor: 'green', 
                justifyContent: 'center', 
                alignItems: 'center', marginRight: 15
            }}>
                <Icons 
                    icon={icon}
                    iconName={iconName}
                    iconSize={iconSize}
                    iconColor={COLORS.grey}
                />

            </View>
            <Text style={[T1, {color: COLORS.grey}]}>{title}</Text>

        </View>
      <Icons 
        icon={icons.MaterialIcons}
        iconName={'navigate-next'}
        iconSize={22}
        iconColor={COLORS.grey}
      />
    </View>
  )
}

const styles = StyleSheet.create({})