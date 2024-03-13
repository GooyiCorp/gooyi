import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../../helper/constants/size'
import { H5, T2 } from '../../../helper/constants/text'
import { COLORS } from '../../../helper/constants/colors'

export default function SectionTitle({
    title,
    showMoreButton,
}) {
  return (
    <View 
        style={{
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 20,
        }}
    >
        <Text style={[H5]}>{title}</Text>

        {showMoreButton ? 
        <Pressable onPress={() => console.log('show more')}>
            <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.primary}]}>Mehr Anzeigen</Text>
        </Pressable>
        : null}
    </View>
  )
}

const styles = StyleSheet.create({})