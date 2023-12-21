import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import { T1, T4 } from '../../constants/text-style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SearchFeed({
    shopName,
    description,
    distance,
}) {
  return (
    <View style={styles.feedContainer}>
        <View style={styles.logo}>
            <Icons
                icon={icons.AntDesign}
                iconName={'picture'}
                iconSize={30}
                iconColor={COLORS.mainBackground}
            />
        </View>
        <View style={{height: 60, width: '79%'}}>

            <View style={{height: '70%'}}>
                <Text style={[T1, {fontFamily: 'RH-Medium', color: COLORS.grey}]} >{shopName}</Text>
                  <Text style={T4}>{description.map((item, index) => index !== description.length - 1 ? <Text>{item.name}, </Text> : <Text>{item.name}</Text>)}</Text>
            </View>

            <View style={{height: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>

                {/* Distance */}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons name="map-marker" size={14} color='#B84058'/>
                  <Text style={[T4, {marginLeft: 5}]}>{distance}</Text>
                </View>

            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    feedContainer: {
        width: width-60,
        // backgroundColor: 'yellow',
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: COLORS.ivoryDark
    },

    logo: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: COLORS.ivoryDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    }
})