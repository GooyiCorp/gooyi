import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../helper/constants/colors'
import { width } from '../../helper/constants/size'
import { H5 } from '../../helper/constants/text'
import Icons, { icons } from '../universal/Icons/Icons'

export default function ManagementHeader() {
  return (
    <View style={{position: 'absolute', width: width}}>
        <View 
            style={{
                paddingHorizontal: 20,
                marginTop: 40,
                height: 70,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <View 
                style={{
                    flexDirection: 'row'
                }}
            >
                <View style={{padding: 5, borderBottomWidth: 0.5, borderColor: COLORS.lightGrey, marginHorizontal: 10, }}>
                    <Text style={[H5]}>Geschäft</Text>
                </View>
                <View style={{padding: 5, marginHorizontal: 10}}>
                    <Text style={[H5, {fontFamily: 'RH-Regular', color: COLORS.lightGrey}]}>Personal</Text>

                </View>
            </View>

            <Icons 
                icon={icons.AntDesign}
                iconName={'bells'}
                iconSize={27}
                iconColor={COLORS.grey}
                iconStyle={{
                    marginRight: 10
                }}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})