import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { MainHeader, SubHeader } from '../../../index/navIndex'
import { COLORS } from '../../../index/constantsindex'
import { H1, T1, T2 } from '../../../constants/text-style'
import StoreInfo from '../../../components/components_stores_screen/StoreInfo'
import Icons, { icons } from '../../../components/components_universal/Icons'

export default function StoreEntry() {
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
        <View style={styles.headerImgContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons 
                    icon={icons.Ionicons}
                    iconName={'heart-outline'}
                    iconSize={18}
                    iconColor={COLORS.grey}
                />
                <Text style={[T2, {marginLeft: 5}]}>20</Text>
            </View>
        </View>

        <View style={styles.contentSection}>
            {/* Header Section */}
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[H1, {marginRight: 10}]}>Dat Backhus</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icons 
                            icon={icons.Ionicons}
                            iconName={'heart-outline'}
                            iconSize={18}
                            iconColor={COLORS.grey}
                        />
                        <Text style={[T2, {marginLeft: 5}]}>20</Text>
                    </View>
                </View>
                {/* <Text style={[T2, styles.box]}>Bremen, Hauptbahnhof</Text> */}
                
                <Text style={[T1, {marginTop: 15}]}>Frische handgemachte Brötchen, Kuchen und Gebäcke.</Text>
            </View>

            {/* Info Section  */}
            <View style={{marginTop: 20}}>

                <StoreInfo 
                    icon={icons.Ionicons}
                    iconName={'ios-time'}
                    iconSize={18}
                    iconColor={COLORS.primary}
                    text={'noch 2 Stunden geöffnet'}
                />
            </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headerImgContainer: {
        height: 0.35*height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },

    contentSection: {
        height: height-(0.3*height),
        width: width,
        padding: 30,
    },

    box: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: COLORS.grey,
        marginLeft: 2,
        color: COLORS.white,
        alignSelf: 'baseline',
        marginTop: 5,
    },

    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
})