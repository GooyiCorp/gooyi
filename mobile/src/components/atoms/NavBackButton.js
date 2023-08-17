import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function NavBackButton() {
  return (
    <TouchableOpacity style={styles.icon}>
        <Ionicons name="md-chevron-back" size={20} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        backgroundColor: '#eeeeee',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    }
})