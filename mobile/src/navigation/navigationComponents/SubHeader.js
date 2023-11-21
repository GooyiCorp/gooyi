import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable} from 'react-native'
import React, { useState } from 'react'



import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import Icons, { icons } from '../../components/components_universal/Icons.js'
import { moderateScale } from '../../helper/scale'
import SearchBox from '../../components/components_search_screen/SearchBox.js'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { TopNavButton } from '../../components/components_universal/TopNavButton'
import { width } from '../../constants/size'
import LocateButton from '../../components/components_locate_screen/LocateButton.js'

export default function SubHeader({
    search,
    topnavbutton,
    topnavbuttonlists,
    goBack,
    onPressGoBack,
    userID,
    idNumber,
    locateButton,
    onPressLocate,
    subHeaderContainerStyle,
    onPressSearch,
    onPressSetting,
}) {

  return (
    <View style={[styles.subHeaderContainer, subHeaderContainerStyle]}>
        <View style={styles.subHeaderJustifyView}>

            {/* -------------------------------------------------------------------- Search Box Button */}
            {search && <RoundButton 
                icon={icons.Ionicons}
                iconName={'search'}
                iconSize={moderateScale(22,0.2)}
                iconColor={COLORS.ivory}
                style={{
                    backgroundColor: COLORS.grey,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    marginLeft: 0,
                    borderRadius: 10,
                }}
                onPressButton={onPressSearch}
                activeOpacity={1}
            />}

            {/* -------------------------------------------------------------------- Go Back Button */}
            {goBack && <RoundButton 
                icon={icons.Ionicons}
                iconName={'md-chevron-back'}
                iconSize={moderateScale(28,0.2)}
                iconColor={COLORS.white}
                style={{
                    backgroundColor: COLORS.grey,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    marginLeft: 0,
                }}
                onPressButton={onPressGoBack}
            />}
            
            {/* -------------------------------------------------------------------- Locate Button */}
            {locateButton && <LocateButton onPress={onPressLocate}/>}

            {/* -------------------------------------------------------------------- Nav Button */}
            {topnavbutton && <View style={{flexDirection: 'row', marginLeft: 5}}>
                <TopNavButton lists={topnavbuttonlists}/>
            </View>}

            {/* -------------------------------------------------------------------- ID Text */}
            {userID && <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RoundButton 
                    icon={icons.AntDesign}
                    iconName={'setting'}
                    iconSize={moderateScale(29,0.2)}
                    iconColor={COLORS.subPrimary}
                    style={{
                        backgroundColor: COLORS.subPrimary02,
                        height: moderateScale(38,0.2),
                        width: moderateScale(38,0.2),
                        marginLeft: 0,
                    }}
                    onPressButton={onPressSetting}
                />

                <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{idNumber}</Text></Text>
            </View>}
            

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subHeaderContainer: {
        height: 60,
        width: width,
        backgroundColor: 'transparent',
        //paddingVertical: 5,
        
    },
    
    subHeaderJustifyView: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 30,
    },

    icon: {
        width: 36,
        height: 36,
        backgroundColor: 'rgba(186, 186, 186, 0.2)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    id: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
    }
})