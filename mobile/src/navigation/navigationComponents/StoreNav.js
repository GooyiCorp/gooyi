import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { moderateScale } from '../../helper/scale'
import { H4, T1 } from '../../constants/text-style'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'

export default function StoreNav({
    qrButton,
    onPressQRButton,
    headerContainerStyle,
    rightComponent,
    leftComponent,
    goBack,
    onPressGoBack,
    quickSelection,
    onPressQuickSelection,
    animationValue,
    headerHeight,
}) {
    const animation = useDerivedValue(() => {
        const a = animationValue.value
        return a;
    })

    const buttonBackground = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animation.value, [headerHeight*0.5, headerHeight*0.8], [COLORS.white05 , COLORS.default])
        }
    })
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

            {/* -------------------------------------------------------------------- Quick Selection Button */}
            {quickSelection && 
            <Animated.View style={[{
                height: 38,
                width: 38,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
            }, buttonBackground]}>
                <RoundButton 
                icon={icons.MaterialIcons}
                iconName={'more-vert'}
                iconColor={COLORS.grey}
                iconSize={moderateScale(26,0.2)}
                style={{
                        backgroundColor: 'transparent',
                        height: moderateScale(38,0.2),
                        width: moderateScale(38,0.2),
                    }}
                onPressButton={onPressQuickSelection}
                />
            </Animated.View>}

        </View>
    )

    // ------------------------------------------------------------------------------------------------------------------------- Title View
    const LeftView = () => (
        leftComponent ? leftComponent : 
        <View style={[styles.view, styles.rightView]}>
            
            {/* -------------------------------------------------------------------- Back Button */}
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

        </View>
    )
  
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <View style={[styles.headerDefaultContainer, headerContainerStyle]}>
            <View style={styles.headerJustifyView}>
                <LeftView />
                <RightView />
            </View>
        </View>

  )
}

const styles = StyleSheet.create({

    headerDefaultContainer: {
        height: 110,
        width: width,
        justifyContent: 'flex-end',

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

    view: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    rightView: {
        justifyContent: 'flex-end',
    },

})