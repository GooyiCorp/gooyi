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
import { runOnUI } from 'react-native-reanimated'
import Icons, { icons } from '../../components/components_universal/Icons'

export default function LocateRequired({}) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
  return (
    <View style={styles.mainCard}>

        <View style={{width: width-60, height: width-60, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/fox-map.png')} resizeMode='contain' style={{maxWidth: '110%'}}/>
        </View>
               
        {/* <Text style={[H1, {fontSize: 50, textAlign: 'center'}]}>Oooops!</Text> */}
        <Text style={[H3, {fontFamily:'RH-Medium',textAlign: 'center', marginTop: 10}]}>Wir konnten dich nicht finden!</Text>
        
        <Text style={[T1, {marginTop: 10, textAlign:'center', marginBottom: 20}]}>Um dir passende Inhalte zeigen zu können benötigen wir eine genaue Position.{"\n"}</Text>

        <BigButton 
            title={'Position freigeben'} 
            bgStyle={{backgroundColor: COLORS.primary, maxWidth: '100%'}}
            titleStyle={{color: COLORS.white, fontFamily: 'RH-Medium'}}
            onPress={() => runOnUI(dispatch(setPage('profile')))}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <BigButton 
                title={'Manuelle Eingabe'} 
                bgStyle={{backgroundColor: COLORS.ivoryDark, maxWidth: '80%'}}
                titleStyle={{color: COLORS.grey, fontFamily: 'RH-Medium'}}
                onPress={() => runOnUI(dispatch(setPage('profile')))}
            />
            <View style={{height: 50, width: '17%', backgroundColor: COLORS.ivoryDark, marginVertical: 5, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                <Icons 
                    icon={icons.MaterialIcons}
                    iconName={'location-city'}
                    iconSize={24}
                    iconColor={COLORS.grey}
                />
            </View>
        </View>
        
    </View>

  )
}

const styles = StyleSheet.create({

    mainCard: {
        width: width,
        height: height,
        backgroundColor: COLORS.mainBackground,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
        position: 'absolute',
    },
    
})