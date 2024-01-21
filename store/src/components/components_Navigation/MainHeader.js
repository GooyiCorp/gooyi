import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import SmallButton from '../universal/Buttons/SmallButton'
import { icons } from '../universal/Icons/Icons'
import { useNavigation } from '@react-navigation/native'

export default function MainHeader() {
    const navigation = useNavigation()

  return (
    <View style={styles.container}>
        <View style={styles.leftView}>
            <Image 
                source={require('../../../assets/image/menuIcon.png')}
                resizeMode='contain'
                style={{maxWidth: 35}}
            />
        </View>
        <View style={styles.rightView}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../../../assets/image/LogoYoko.png')}
                    resizeMode='contain'
                    style={{maxWidth: '80%'}}
                />
            </View>
            <SmallButton 
                leftIcon={icons.MaterialCommunityIcons} leftIconName={'line-scan'} leftIconSize={22} leftIconColor={COLORS.mainBackground} leftIconStyle={{marginRight: 10}}
                label={'Einlösen'} 
                styleLabel={{fontFamily: 'RH-Medium', color: COLORS.mainBackground}} styleContainer={{backgroundColor: COLORS.primary}}
                onPress={() => navigation.navigate('Redeem')}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: width,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 30
        // alignItems: 'flex-start'
    },
    leftView: {
        height: 40,
        justifyContent: 'center'
    },
    rightView: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginRight: 10
    }
})