import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { moderateScale } from '../../helper/scale'

export default function StoreNav({
    qrButton,
    onPressQRButton,
    headerContainerStyle,
    rightComponent,
    leftComponent,
    goBack,
    onPressGoBack,
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

            {/* -------------------------------------------------------------------- Quick Selection Button */}
            {quickSelection && <RoundButton 
                icon={icons.MaterialIcons}
                iconName={'more-vert'}
                iconColor={COLORS.subPrimary}
                iconSize={moderateScale(26,0.2)}
                style={{backgroundColor: COLORS.white05,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                }}
                onPressButton={onPressQuickSelection}
            />}

        </View>
    )

    // ------------------------------------------------------------------------------------------------------------------------- Title View
    const LeftView = () => (
        leftComponent ? leftComponent : 
        <View style={[styles.view, styles.rightView]}>
            
            {/* -------------------------------------------------------------------- QR Button */}
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