import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { moderateScale } from '../../helper/scale'
import BigButton from '../../components/components_LogIn/BigButton'
import { useNavigation } from '@react-navigation/native'
import { H1, H3, T1, T2, T4 } from '../../constants/text-style'
import { useDispatch } from 'react-redux'
import { setPage } from '../../redux/slices/mainNavSlice'

export default function LogInRequired({}) {
    const dispatch = useDispatch()
  return (
    <View style={styles.mainCard}>

        <View style={{width: width-60, height: width-60, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
            <Image source={require('../../../assets/image/foxLock2.png')} resizeMode='contain' style={{maxWidth: '110%'}}/>
        </View>
               
        <Text style={[H1, {fontSize: 50, textAlign: 'center'}]}>Oooops!</Text>
        <Text style={[H3, {fontFamily:'RH-Medium',textAlign: 'center', marginTop: 10}]}>Anmeldung erforderlich.</Text>
        
        <Text style={[T1, {marginTop: 10, textAlign:'center', marginBottom: 20}]}>Um diese Seite aufrufen zu können, {"\n"}musst du angemeldet sein.</Text>

        <BigButton 
            title={'Zur Anmeldung'} 
            bgStyle={{backgroundColor: COLORS.primary, maxWidth: '100%', borderRadius: 16}}
            titleStyle={{color: COLORS.white, fontFamily: 'RH-Medium'}}
            onPress={() => dispatch(setPage('profile'))}
        />
        
    </View>

  )
}

const styles = StyleSheet.create({

    mainCard: {
        width: width,
        height: height,
        backgroundColor: COLORS.mainBackground,
        padding: 30,
        zIndex: 6,
    },
    
})