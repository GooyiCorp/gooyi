import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'
import StatisticBox from './StatisticBox'
import RoundButton from '../components_universal/RoundButton'



export default function ProfileInformation() {
  return (
    <View style={styles.cardStyle}>
        {/* <View style={styles.infoView}>
            <Text style={[styles.t1, {fontFamily: 'RH-Bold', marginRight: 5}]}>Nutzer ID:</Text>
            <Text style={[styles.t1, {fontFamily: 'RH-Medium'}]}>1425.3678.001</Text>
        </View> */}

        <View style={styles.infoView}>
            <Icons 
                icon={icons.MaterialCommunityIcons}
                iconName={'clock'}
                iconSize={20}
                iconColor={COLORS.grey}
                iconStyle={{marginRight: 5, marginLeft: -1.5}}

            />
            <Text style={styles.t1}>Aktiv, seit </Text>
            <Text style={styles.t1}>Oktober 2023</Text>
        </View>

        {/* <RoundButton
            icon={icons.Ionicons}
            iconName={'settings-sharp'}
            iconSize={20}
            iconColor={COLORS.white}
            style={{
                height: 38,
                width: 38,
                borderRadius: 10,
                marginTop: 20,
                marginHorizontal: 0,
                backgroundColor: COLORS.borderGrey
            }}
        /> */}

        {/* <View style={styles.imgContainer}>
            <Image 
                source={require('../../../assets/image/coupon1.png')}
                resizeMode='contain'
                style={{maxWidth: '100%'}}
            />
        </View> */}

        <StatisticBox/>
    </View>
  )
}

const styles = StyleSheet.create({
    cardStyle: {
        width: width,
        //height: 200,
        //backgroundColor: 'yellow',
        paddingHorizontal: 30,
    },

    t1: {
        fontFamily: 'RH-Medium',
        fontSize: 15
    },

    infoView: {
        flexDirection: 'row', 
        marginTop: 5, 
        alignItems: 'center',
    },

    imgContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statsbox: {
        width: (0.6*width)-35,
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 16
    }
})