import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// Helpers
import { T4 } from '../../../../helper/constants/text'
import { COLORS } from '../../../../helper/constants/colors'
import { width } from '../../../../helper/constants/size'
// Components
import KeyButton from '../../../universal/Buttons/KeyButton'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TargetSelection() {

    let selectedTarget = []

    const targetList = [
        'Neukunden', 'Stammkunden', 'Zufällig', 'Kunden (Besuch liegt weit zurück)'
    ]

    const handleSelectTarget = (target) => {
        if (selectedTarget.includes(target)) {
            selectedTarget = selectedTarget.filter(element => element !== target)
        } else {
            selectedTarget.push(target)
        }
        console.log(selectedTarget)
    }
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={{top: -17}}>
    {/* ---- Label */}
    <Text style={[T4, styles.label, {marginBottom: 5}]}>Priorisierung</Text>
    {/* ---- start - Target Selection Section */}
    <View style={{width: width, marginLeft: -30, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        {targetList.map((target) => (
            <KeyButton 
                key={target} 
                keyWords={target} 
                onPress={() => (handleSelectTarget(target))}
                styleContainer={{
                    backgroundColor: selectedTarget.includes(target) ? COLORS.grey : COLORS.ivory
                }}
            />
        ))}
    </View>
    {/* ---- end - Target Selection Section */}
</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    label: {
        color: COLORS.grey,
        fontFamily: 'RH-Bold',
    },
})