import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, width } from '../../../constants/size'
import { MainHeader, SubHeader } from '../../../index/navIndex'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../index/constantsindex'
import InputBox from '../../../components/components_LogIn/InputBox'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function EnterEmail() {

    const navigation = useNavigation()

    const [dismiss, setDismiss] = useState(false)

    // const handleDismiss = () => {
    //   setDismiss(false)
    // }

  return (
     
    <>

        {/* Main Header */}
        <MainHeader 
        title='Anmelden'
        />

        {/* Sub Header */}
        <SubHeader 
        goBack
        onPressGoBack={() => navigation.navigate('Main')}
        />

        <InputBox 
            label={'E-Mail'}
            dismiss={dismiss}
            setDismiss={setDismiss}
        />

        <Button title='test' onPress={() => console.log('press')}/>
        <Pressable style={{height: height, width: width, zIndex: -1, position: 'absolute', backgroundColor: 'white'}} onPressIn={() => {setDismiss(true)}} onPressOut={() => {setDismiss(false)}}></Pressable>
    </>
  )
}

const styles = StyleSheet.create({})