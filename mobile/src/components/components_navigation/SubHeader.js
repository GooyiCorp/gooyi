import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable} from 'react-native'
import React from 'react'
// Constant
import { T2 } from '../../constants/text-style.js'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
// Helpers
import { moderateScale } from '../../helper/scale'
// Components
import RoundButton from '../../components/components_universal/RoundButton'
import Icons, { icons } from '../../components/components_universal/Icons.js'
import { TopNavButton } from '../../components/components_universal/TopNavButton'
import LocateButton from '../../components/components_locate_screen/LocateButton.js'
import TapButton from '../components_universal/TapButton.js'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function SubHeader({
    search,
    onPressSearch,

    topnavbutton,
    topnavbuttonlists,

    goBack,
    onPressGoBack,

    locateButton,
    onPressLocate,

    subHeaderContainerStyle,
    
    // ---- Profile Screen
    setting,
    onPressSetting,

    mail,

    activity,
}) {

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={[styles.subHeaderContainer, subHeaderContainerStyle]}>

    {/* ---- Search Button */}
    {search &&
        <RoundButton 
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
        />
    }

    {/* ---- Go Back Button */}
    {goBack && 
        <RoundButton 
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
        />
    }
    
    {/* ---- Locate Button */}
    {locateButton && 
        <LocateButton onPress={onPressLocate}/>
    }

    {/* ---- Nav Button List */}
    {topnavbutton && 
        <View style={{flexDirection: 'row', marginLeft: 5}}>
            <TopNavButton lists={topnavbuttonlists}/>
        </View>
    }

    {/* ---- start - Profile Screen Buttons */}
        {/* ---- Setting Button */}
        {setting && 
            <Pressable
                style={{flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.ivoryDark, borderRadius: 10, height: 38, paddingLeft: 8, paddingRight: 10}}
                onPress={onPressSetting}
            >
                <Icons
                    icon={icons.MaterialIcons}
                    iconName={'settings'}
                    iconSize={24}
                    iconColor={COLORS.grey}
                />
                <Text style={[T2, {marginLeft: 6, color: COLORS.grey, fontFamily: 'RH-Medium'}]}>Einstellungen</Text>
            </Pressable>
        }
        {/* ---- Mail Button */}
        {mail && 
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'mail'}
                iconSize={24}
                iconColor={COLORS.grey}
                style={{
                    backgroundColor: COLORS.ivoryDark,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    margin: 0,
                    marginLeft: 10,
                    borderRadius: 10,
                }}
            />
        }
        {/* ---- Activity History Button */}
        {activity && 
            <TapButton 
                icon={icons.MaterialIcons}
                iconName={'history'}
                iconSize={26}
                iconColor={COLORS.grey}
            />
        }
    {/* ---- end - Profile Screen Buttons */}

</View>
)
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    subHeaderContainer: {
        height: 60,
        width: width,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 30,
        paddingBottom: 20,
    },

})