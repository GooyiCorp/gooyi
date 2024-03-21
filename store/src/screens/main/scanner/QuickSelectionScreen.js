import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import ItemCard from '../../../components/components_Scanner/ItemCard'
import { COLORS } from '../../../helper/constants/colors'
import { ScrollView } from 'react-native-gesture-handler'

export default function QuickSelectionScreen() {
  return (
    <View style={{width: width, height: height, paddingTop: 200, backgroundColor: COLORS.white}}>
      <ScrollView>
        <View style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            flexDirection: 'row',
            flexWrap: 'wrap', 
            justifyContent: 'space-between'
        }}>
            <ItemCard />
            <ItemCard />
            <ItemCard />

        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})