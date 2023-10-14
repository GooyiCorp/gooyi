import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icons, {icons} from '../components_universal/Icons'

export default function ProfileScreenButton({
    type,
    ico,
    size,
    title,
}) {
  return (
    <View>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>

            <View style={{height: 60, width: 60, backgroundColor: '#F4F4F4', justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginBottom: 15}}>
                <Icons icon={type} iconName={ico} iconColor='#000000' iconSize={size}/>
            </View>
            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 15}}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})