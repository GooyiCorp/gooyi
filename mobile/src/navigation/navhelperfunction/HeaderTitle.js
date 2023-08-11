import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

export default function GetHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Stores1';
    const routeName2 = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Stores1' : return 'Stores';
        case 'Store2' : return 'Test2';
    }

    switch (routeName2) {
        case 'Finder' : return 'Findert';
        case 'Home' : return 'Entdecken';

    }
}

const styles = StyleSheet.create({})