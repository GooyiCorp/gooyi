import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { moderateScale } from '../../helper/scale'
import BigButton from '../../components/components_LogIn/BigButton'
import CloseSaveButton from '../../components/components_profile_screen/CloseSaveButton'

export default function SettingHeader({
    goBack,
    onPressGoBack,
    userID,
    close,
    buttonText2,
    buttonText1,
    editButton,
    onPressClose,
}) {

    const [edit, setEdit] = useState(false)

    const handeEdit = () => {
        setEdit(!edit)
    }
    
  return (
    <View style={styles.container}>
        
        <View style={styles.justifyLayer}>

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
                        }}
                        onPressButton={onPressGoBack}
                    />}

            {/* -------------------------------------------------------------------- Go Back Button */}
            {close && 
                <CloseSaveButton
                    handleSave={() => console.log('save')}
                    handleClose={onPressClose}
                    edit={edit}
                />
            }

            {/* -------------------------------------------------------------------- User ID */}
            {userID && <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.label]}>Nutzer ID</Text>
                    <Text style={[styles.label, {fontFamily: 'RH-Medium'}]}>1226.1238.23</Text>
            </View>}
            
            {/* -------------------------------------------------------------------- Edit Button */}
            {editButton && <Pressable 
                style={{paddingVertical: 10}}
                onPress={handeEdit}
            >
                <Text style={[styles.label]}>{edit? buttonText2 : buttonText1}</Text>
            </Pressable>
            
            
            
            }

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 120,
        //backgroundColor: COLORS.white05,
        //position: 'absolute',
        //top: 0,
        // paddingHorizontal: 30,
        // paddingBottom: 10,
        justifyContent: 'flex-end'
        // borderBottomLeftRadius: 16,
        // borderBottomRightRadius: 16,
    },

    justifyLayer: {
        height: 38,
        width: '100%',
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        top: 0,
        paddingHorizontal: 25,
        marginTop: 60,
        position: 'absolute',
    },

    label: {
        fontFamily: 'RH-Bold',
        fontSize: 15,
        color: COLORS.primary,
        marginRight: 5,
        textAlign: 'center'
    },

    h2: {
        fontFamily: 'RH-Bold',
        fontSize: 20,
        color: COLORS.grey,
      },

    infoText: {
        fontFamily: 'RH-Medium',
        color: COLORS.black,
        fontSize: 15,
      },
})