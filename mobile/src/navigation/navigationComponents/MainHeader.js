import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

import { Feather, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CategorySelectorCarousel from '../../components/components_finder_screen/CategorySelectorCarousel'
import { COLORS } from '../../index/constantsindex'
import { moderateScale } from '../../helper/scale'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons.js'


// Main Declaration -----------------------------------------------------------------------------------------------------------------------------------------
export default function MainHeader({
    title, 
    headerContainerStyle,
    titleStyle, 
    mapButton, 
    onPressMapButton, 
    rightComponent,
    qrButton,
    onPressQRButton,
    notificationButton,
    onPressNotificationButton,
    categorySelector,
    quickSelection,
    onPressQuickSelection
}) {

    // ------------------------------------------------------------------------------------------------------------------------- Right View
    const RightView = () => (
        rightComponent ? rightComponent : 
        <View style={[styles.view, styles.rightView]}>
            
            {/* -------------------------------------------------------------------- QR Button */}
            {qrButton && <RoundButton 
                icon={icons.MaterialCommunityIcons} 
                iconName={'qrcode-scan'} 
                iconColor={COLORS.white} 
                iconSize={moderateScale(21,0.2)} 
                style={{backgroundColor: COLORS.primary}}
                onPressButton={onPressQRButton}
            />}

            {/* -------------------------------------------------------------------- Map Button  */}
            {mapButton && <TouchableOpacity style={[styles.buttonBackground, {backgroundColor: COLORS.subPrimary}]} onPress={onPressMapButton}>
                <View style={{height: 24, width: 24, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, right: 2, bottom: 3}}>
                <MaterialCommunityIcons name='map-marker' size={14} color='#fff' style={{position: 'absolute', zIndex: 1}}/>
                <Fontisto name='map-marker' size={18} color={COLORS.subPrimary} style={{position: 'absolute'}}/>
                </View>
                <Feather name="map" size={20} color="#fff" style={{transform: [{rotateY: '180deg'}]}}/>
            </TouchableOpacity>}

            {/* -------------------------------------------------------------------- Notification Button */}
            {notificationButton && <RoundButton 
                icon={icons.MaterialIcons}
                iconName={'notifications-none'}
                iconColor={COLORS.grey}
                iconSize={moderateScale(26,0.2)}
                style={{backgroundColor: COLORS.default}}
                onPressButton={onPressNotificationButton}
            />}

            {/* -------------------------------------------------------------------- Finder Category Selector */}
            {categorySelector && <View style={{height:52, width: 52, justifyContent: 'center', alignItems: 'center'}}>
                <CategorySelectorCarousel/> 
            </View>}

            {/* -------------------------------------------------------------------- Quick Selection Button */}
            {quickSelection && <RoundButton 
                icon={icons.MaterialIcons}
                iconName={'more-vert'}
                iconColor={COLORS.subPrimary}
                iconSize={moderateScale(26,0.2)}
                style={{backgroundColor: COLORS.white05}}
                onPressButton={onPressQuickSelection}
            />}

        </View>
    )

    // ------------------------------------------------------------------------------------------------------------------------- Title View
    const TitleView = () => (
        <View>
            <Text style={[styles.titleDefaultStyle, titleStyle]}>{title}</Text>
        </View>
    )
  
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <View style={[styles.headerDefaultContainer, headerContainerStyle]}>
            <View style={styles.headerJustifyView}>
                <TitleView />
                <RightView />
            </View>
        </View>
  )
}

// Styles ---------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    
    headerDefaultContainer: {
        height: 110,
        width: '100%',
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end',
        //borderRadius: 50,
    },

    headerJustifyView: {
        height: 60,
        paddingLeft: 30,
        paddingRight: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'yellow',
    },

    titleDefaultStyle: {
        fontFamily: 'RH-Medium', 
        fontSize: moderateScale(30,0.2), 
        top: 5,
    },

    view: {
        flexDirection: 'row',
    },

    rightView: {
        justifyContent: 'flex-end',
    },

    bgView: {
        height: 42,
        width: 42,
        backgroundColor: '#c7c7c7',
        borderRadius: 50,
      },

    buttonBackground: {
        height: 42,
        width: 42,
        backgroundColor: '#B84058',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
})