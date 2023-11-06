import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import { Image } from 'react-native'

export default function ActivityHistoryFeed({
    logo,
    time,
    progress,
    reward,
    storeName,
}) {
  return (
    <View style={styles.cardStyle}>

        <View style={{flexDirection: 'row', width: '80%', paddingRight: 10}}>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/image/Yoko_Logo_WEB.png')} style={{resizeMode: 'contain', maxWidth: '100%'}}/>
            </View>

            {/* Information */}
            <View style={styles.infoContainer}>
                <Text style={styles.t1}>{storeName}</Text>
                <Text style={[styles.t2, {fontFamily: 'RH-Light'}]}>{time}</Text>    
            </View>

            {/* Progress */}
            <View style={styles.progressContainer}>
                <Text style={[styles.t2, {fontFamily: 'RH-Light'}]}>{progress}</Text>
            </View>

        </View>

        {/* Reward */}
        <View style={styles.rewardContainer}>
            <Text style={[styles.h3, {fontFamily: 'RH-Bold', color: COLORS.grey, lineHeight: 40}]}>{reward}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    cardStyle: {
        width: '100%',
        height: 60,
        backgroundColor: COLORS.mainBackground,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    logoContainer: {
        width: 40,
        height: 40,
        // backgroundColor: COLORS.white,
        borderRadius: 10,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoContainer: {
        width: '60%',
        height: '100%',
        // backgroundColor: 'yellow',
        marginRight: 10,
    },

    progressContainer: {
        width: '25%',
        height: '100%',
        // backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rewardContainer: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems:'center',
        // backgroundColor: 'green'
    },

    t1: {
        fontFamily: 'RH-Regular',
        fontSize: 16
      },

      t2: {
        fontFamily: 'RH-Regular',
        fontSize: 14,
      },

      h3: {
        fontFamily: 'RH-Light',
        fontSize: 24,
      },
})