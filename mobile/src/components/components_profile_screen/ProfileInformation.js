import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../constants/size'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'

export default function ProfileInformation() {
  return (
    <View style={styles.cardStyle}>
        <View style={styles.infoView}>
            <Text style={[styles.t1, {fontFamily: 'RH-Bold', marginRight: 5}]}>Nutzer ID:</Text>
            <Text style={[styles.t1, {fontFamily: 'RH-Medium'}]}>1425.3678.001</Text>
        </View>

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

        <View style={styles.infoView}>
            <Icons 
                icon={icons.FontAwesome}
                iconName={'globe'}
                iconSize={19}
                iconColor={COLORS.grey}
                iconStyle={{marginRight: 6.5}}
            />
            <Text style={styles.t1}>Deutschland</Text>
        </View>
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
    }
})