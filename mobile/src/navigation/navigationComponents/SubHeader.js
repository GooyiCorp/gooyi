import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable} from 'react-native'
import React, { useState } from 'react'

import { TopNavButton } from '../../components/atoms/TopNavButton'

import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import Icons, { icons } from '../../components/atoms/Icons.js'
import { moderateScale } from '../../helper/scale'
import SearchBox from '../../components/components_universal/SearchBox'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

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
    iconState,
}) {

    const transition = useSharedValue(0)
    const [showInputBox, setShowInputBox] = useState(1)

    const handlePress = () => {
        setShowInputBox(showInputBox == 1? 0 : 1)
        if (showInputBox == 1) {
            transition.value = withTiming(1, {duration: 300})
        } else {
            transition.value = withDelay(300,withTiming(0, {duration: 300}))
        }
        console.log(showInputBox)
    }

    const hideComponents = useAnimatedStyle( () => {
        const opacity = interpolate(transition.value, [0, 1], [1, 0])
        const scale = interpolate(transition.value, [0, 1], [1, 0])
        return {
            transform: [{scale: scale}],
            opacity: opacity,
        }
    })

  return (
    <View style={[styles.subHeaderContainer, subHeaderContainerStyle]}>
        <View style={styles.subHeaderJustifyView}>

            {/* -------------------------------------------------------------------- Search Box Button */}
            {search && <RoundButton 
                        icon={icons.Ionicons}
                        iconName={iconState? 'close': 'search'}
                        iconSize={moderateScale(22,0.2)}
                        iconColor={COLORS.subPrimary}
                        style={{
                            backgroundColor: COLORS.subPrimary02,
                            height: moderateScale(38,0.2),
                            width: moderateScale(38,0.2),
                            marginLeft: 0
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
            {locateButton && <Animated.View style={[{
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center',
            },
                hideComponents
            ]}>
                <Pressable 
                    style={{flexDirection: 'row'}} 
                    onPress={onPressLocate}
                >
                    <RoundButton 
                        icon={icons.Ionicons}
                        iconName={'ios-navigate'}
                        iconSize={moderateScale(20,0.2)}
                        iconColor={COLORS.subPrimary}
                        style={{
                            backgroundColor: COLORS.subPrimary02,
                            height: moderateScale(38,0.2),
                            width: moderateScale(38,0.2),
                            paddingTop: moderateScale(2,0.2),
                            paddingRight: moderateScale(2,0.2),
                        }}
                        onPressButton={onPressLocate}
                        activeOpacity={1}
                    />
                    <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginHorizontal: 5,
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-Regular', 
                            fontSize: moderateScale(13,0.2), 
                            color: COLORS.subPrimary, 
                            marginRight: moderateScale(3,0.2)
                        }}>
                            Standort auswählen
                        </Text>
                        <Icons 
                            icon={icons.Ionicons}
                            iconName={'chevron-down'}
                            iconSize={20}
                            iconColor={COLORS.subPrimary}
                        />
                    </View>
                </Pressable>
            </Animated.View>}


            {topnavbutton && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                <TopNavButton lists={topnavbuttonlists}/>
            </ScrollView>}

            {userID && <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{idNumber}</Text></Text>}

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subHeaderContainer: {
        height: 60,
        backgroundColor: '#fff',
        //paddingVertical: 5
        
    },
    
    subHeaderJustifyView: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 30,
        //backgroundColor: 'red',
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
        fontSize: 12,
        marginLeft: 15,
    }
})