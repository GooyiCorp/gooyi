import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import RoundButton from '../../components/components_universal/RoundButton'
import { icons } from '../../components/components_universal/Icons'
import { moderateScale } from '../../helper/scale'
import BigButton from '../../components/components_LogIn/BigButton'
import CloseSaveButton from '../../components/components_profile_screen/CloseSaveButton'
import IconLabelButton from '../../components/components_universal/IconLabelButton'
import { H2, H3, H4, T2 } from '../../constants/text-style'

export default function SettingHeader({
    goBack,
    onPressGoBack,
    close,
    buttonText2,
    buttonText1,
    editButton,
    onPressClose,
    onPressEdit,
    onPressSave,
    header,
    headerText,
    iconStyle,
}) {

    const [edit, setEdit] = useState(false)

    const handeEdit = () => {
        setEdit(!edit)
        onPressEdit()
    }
    
    const handleSave = () => {
        setEdit(false)
        onPressSave()
    }
  return (
    <View style={styles.container}>
        
        <View style={styles.justifyLayer}>

            {/* -------------------------------------------------------------------- Go Back Button */}
            {goBack && <RoundButton 
                        icon={icons.Ionicons}
                        iconName={'md-chevron-back'}
                        iconSize={moderateScale(28,0.2)}
                        iconColor={iconStyle? iconStyle : COLORS.white}
                        style={{
                            backgroundColor: COLORS.grey,
                            height: moderateScale(38,0.2),
                            width: moderateScale(38,0.2),
                            margin: 0,
                            zIndex: 1
                        }}
                        onPressButton={onPressGoBack}
                    />}

            {/* -------------------------------------------------------------------- Go Back Button */}
            {close && 
                <CloseSaveButton
                    handleSave={handleSave}
                    handleClose={onPressClose}
                    edit={edit}
                />
            }
            
            {/* -------------------------------------------------------------------- Edit Button */}
            {editButton && <Pressable 
                style={{paddingVertical: 10}}
                onPress={handeEdit}
            >
                <Text style={[T2, {fontFamily: 'RH-Medium', color: edit? COLORS.grey : COLORS.primary}]}>{edit? buttonText2 : buttonText1}</Text>
            </Pressable>
            }

            {header && <Text style={[H4, {width: width, position: 'absolute', textAlign: 'center', fontFamily: 'RH-Bold', color: COLORS.grey}]}>{headerText}</Text>}

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 120,
        justifyContent: 'flex-end',
    },

    justifyLayer: {
        height: 38,
        width: '100%',
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        top: 0,
        paddingHorizontal: 30,
        marginTop: 60,
        position: 'absolute',
    },

    label: {
        fontFamily: 'RH-Medium',
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