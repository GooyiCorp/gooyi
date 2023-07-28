import React from 'react'
import { StyleSheet,View, Text } from 'react-native'
import { Avatar } from 'react-native-paper';
import SearchBox from '../../components/atoms/SearchBox';


export default function DiscoverScreen() {
  return (
    <View style={styles.screen}>
      <Text>Entdecke</Text>
      <Avatar.Text size={24} label="XD" />
      <SearchBox />
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        //backgroundColor: 'aquamarine'
    }
})