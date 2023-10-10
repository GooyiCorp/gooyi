import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable} from 'react-native'
import React from 'react'
import SearchBox from '../../components/atoms/SearchBox'
import { TopNavButton } from '../../components/atoms/TopNavButton'

import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import Icons, { icons } from '../../components/atoms/Icons.js'
import { moderateScale } from '../../helper/scale'

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
    subHeaderContainerStyle
}) {
  return (
    <View style={[styles.subHeaderContainer, subHeaderContainerStyle]}>
        <View style={styles.subHeaderJustifyView}>

            {/* -------------------------------------------------------------------- Search Box Button */}
            {search && <SearchBox />}

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
            {locateButton && <View style={{
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
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
            </View>}


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