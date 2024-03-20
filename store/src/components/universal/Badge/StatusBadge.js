import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { T3, T5 } from '../../../helper/constants/text'
import { COLORS } from '../../../helper/constants/colors'
import { height } from '../../../helper/constants/size'

export default function StatusBadge({
    status,
    styleContainer
}) {
    return (
        <View 
            style={[
                {
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    backgroundColor: status == 'Aktiv' ? '#D1ECD3' : '#F5E1E1', 
                    alignSelf: 'flex-start',
                    borderRadius: height,
                },
                styleContainer
            ]}
        >
            <Text 
                style={[
                    T3, 
                    {
                        fontFamily: 'RH-Bold',
                        color: status == 'Aktiv' ? '#31913B' : '#DD758A'
                    }
                ]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})