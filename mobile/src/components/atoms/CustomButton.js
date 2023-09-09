import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function CustomButton({
    title,
    buttonStyle,
    textStyle,
}) {
    const [textWidth, setTextWidth] = useState(0)


  return (
    <TouchableOpacity>
        <View style={[styles.button, {width: textWidth+50}, buttonStyle]}>
            <Text style={[{fontFamily: 'Roboto-Bold', fontSize: 12}, textStyle]} onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    button: {
        height: 30,
        borderRadius: 50,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

