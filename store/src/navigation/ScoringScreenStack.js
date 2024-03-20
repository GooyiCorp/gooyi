import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { height, width } from '../helper/constants/size';
import ScoringHeader from '../components/components_Scanner/ScoringHeader';
import PointsEntryScreen from '../screens/main/scanner/PointsEntryScreen';
import QuickSelectionScreen from '../screens/main/scanner/QuickSelectionScreen';
import { H4, T1, T2, T3 } from '../helper/constants/text';
import { COLORS } from '../helper/constants/colors';

// --- Create Stack Navigator
const Scoring = createStackNavigator();
export default function ScoringScreenStack({navigation}) {
  return (
    <View style={{height: height, width: width}}>

        <ScoringHeader />

        {/* ---- start - Navigation Section */}
        <Scoring.Navigator
            initialRouteName='PointsEntry'
            screenOptions={{
                headerShown: false,    
            }}
        >

            {/* ---- start - Create Screen Section */}
            <Scoring.Screen 
                name='PointsEntry'
                component={PointsEntryScreen}
            />

            <Scoring.Screen 
                name='QuickSelection'
                component={QuickSelectionScreen}
            />
            {/* ---- end - Create Screen Section */}

        </Scoring.Navigator>
        {/* ---- end - Navigation Section */}

        <View style={{
            position: 'absolute', 
            zIndex: 6,
            bottom: 0,
            width: width, 
            paddingBottom: 30,
            paddingTop: 20, 
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity 
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: COLORS.primary,
                    borderRadius: height,
                    marginBottom: 15,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20
                }}
            >
                <Text style={[T1, {color: COLORS.white, fontFamily: 'RH-Bold'}]}>Punkte gutschreiben</Text>
                <Text style={[H4, {color: COLORS.white, fontFamily: 'RH-Bold'}]}>40</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>Abbrechen</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})