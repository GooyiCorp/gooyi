import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { T4 } from '../../../../helper/constants/text'
import { COLORS } from '../../../../helper/constants/colors'
import SmallButton from '../../../universal/Buttons/SmallButton'
import KeyButton from '../../../universal/Buttons/KeyButton'
import { width } from '../../../../helper/constants/size'

export default function TargetSelection() {

    let selectedTarget = []

    const targetList = [
        'Neukunden', 'Stammkunden', 'Zufällig', 'Kunden (Besuch liegt weit zurück)'
    ]

    const handleSelectTarget = (target) => {
        if (selectedTarget.includes(target)) {
            selectedTarget = selectedTarget.filter(element => element !== target)
            // console.log(selectedTarget)
        } else {
            selectedTarget.push(target)
        }
        console.log(selectedTarget)
    }
  return (
    <View style={{top: -17}}>
        <Text style={[T4, styles.label, {marginBottom: 5}]}>Priorisierung</Text>
        <View style={{width: width, marginLeft: -30, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
            {targetList.map((target) => (
                <KeyButton 
                    key={target} 
                    keyWords={target} 
                    onPress={() => (handleSelectTarget(target))}
                    styleContainer={{
                        backgroundColor: selectedTarget.includes(target) == target.includes(target) ? COLORS.grey : COLORS.ivory
                    }}
                />
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    label: {
        color: COLORS.grey,
        fontFamily: 'RH-Bold',
        zIndex: 1,
    },
})