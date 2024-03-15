import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedScreen } from '../../../redux/slices/manageScreenSlice'

export default function ManageTeamScreen({navigation}) {
    const dispatch = useDispatch()
    // Listener Exit Screen
    useEffect(() => {
        const exitScreen = navigation.addListener('blur', () => {
            dispatch(setSelectedScreen('Geschäft'))
        })
        return exitScreen
    }, [navigation])
  return (
    <View>
      <Text>ManageTeamScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})