import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BoundBox({boxHeight, boxWidth, top, left, showBoundingBox}) {
    const cornerHeight = boxHeight/4 <= 30 ? boxHeight/4 : 30
    const cornerRadius = Math.floor(boxHeight/20) >= 5 ? Math.floor(boxHeight/20) : 5
  return (
    <>
    {showBoundingBox && <View style={{position: 'absolute', height: boxHeight, width: boxWidth, top: top, left: left, transform: [{scale: 1.1}]}}>
        <View style={{borderWidth: 2.5, borderColor: 'yellow', height: cornerHeight, width: cornerHeight, borderTopLeftRadius: cornerRadius, borderBottomColor: 'transparent', borderRightColor: 'transparent', position: 'absolute', top: 0, left: 0}}></View>
        <View style={{borderWidth: 2.5, borderColor: 'yellow', height: cornerHeight, width: cornerHeight, borderTopRightRadius: cornerRadius, borderBottomColor: 'transparent', borderLeftColor: 'transparent', position: 'absolute', top: 0, right: 0}}></View>
        <View style={{borderWidth: 2.5, borderColor: 'yellow', height: cornerHeight, width: cornerHeight, borderBottomLeftRadius: cornerRadius, borderTopColor: 'transparent', borderRightColor: 'transparent', position: 'absolute', bottom: 0, left: 0}}></View>
        <View style={{borderWidth: 2.5, borderColor: 'yellow', height: cornerHeight, width: cornerHeight, borderBottomRightRadius: cornerRadius, borderTopColor: 'transparent', borderLeftColor: 'transparent', position: 'absolute', bottom: 0, right: 0}}></View>
    </View>}
    </>
  )
}

const styles = StyleSheet.create({})
