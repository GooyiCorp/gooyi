import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Accordion from './Accordion'
import {icons} from '../atoms/Icons'

const data = [
    {
        title: 'Meine Informationen',
        content: ['Profil bearbeiten', 'Passwort und Sicherheit'],
        type: icons.MaterialCommunityIcons,
        ico: 'shield-account',
        size: 24,
        showShevron: true,
    },
    {
        title: 'Zahlungsmethode',
        content: [],
        type: icons.FontAwesome,
        ico: 'credit-card',
        size: 20,
        showShevron: false,
    },
    {
        title: 'App Einstellungen',
        content: [],
        type: icons.Ionicons,
        ico: 'settings-outline',
        size: 22,
        showShevron: false,
    },
    {
        title: 'Informationen',
        content: [],
        type: icons.Ionicons,
        ico: 'information-circle-outline',
        size: 24,
        showShevron: false,
    },
]

export default function AccordionContainer() {
  return (
    <View>
      {data.map((value, index) => {
        return <Accordion value={value} key={index}/>;
      })}
    </View>
  )
}

const styles = StyleSheet.create({})