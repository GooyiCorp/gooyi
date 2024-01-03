import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../index/constantsindex'
import { icons } from '../../components/components_universal/Icons'
import RoundButton from '../../components/components_universal/RoundButton'
import { height, width } from '../../constants/size'
import { moderateScale } from '../../helper/scale'
import UserFeed from '../../components/components_cart_screen/UserFeed'

export default function SendAsGift({
    navigation,
    navigation: {goBack}
}) {

    const [data, setData] = useState('')
// ----------------------------  
// Handler Section
// ---------------------------- 
    // ---- handle Clear Button
    const handleClear = () => {
        setData('')
        Keyboard.dismiss()
    }
    // ---- handle Go Back Button
    const handleGoBack = () => {
        goBack()
    }

  return (
    <View style={styles.card}>
        <View style={styles.container}>
            <RoundButton 
                icon={icons.Ionicons}
                iconName={'md-chevron-back'}
                iconSize={moderateScale(28,0.2)}
                iconColor={COLORS.white}
                style={{
                    backgroundColor: COLORS.grey,
                    height: moderateScale(38,0.2),
                    width: moderateScale(38,0.2),
                    margin: 0,
                }}
                onPressButton={handleGoBack}
            />

            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Senden an'
                    placeholderTextColor={COLORS.grey}
                    style={{
                        flex: 1,
                        paddingLeft: 15,
                        paddingRight: 50,
                        fontFamily: 'RH-Regular',
                        fontSize: 15,
                    }}
                    returnKeyType='search'
                    autoComplete='off'
                    autoCorrect={false}
                    keyboardAppearance='dark'

                    value={data}
                    onChangeText={(e) => setData(e)}
                />
                <View 
                    style={[
                        styles.rightView,
                        {zIndex: data? 1 : 0}
                    ]}
                >
                    {/* Clear Button */}
                    <RoundButton
                        icon={icons.Ionicons}
                        iconName={'close'}
                        iconSize={30}
                        iconColor={COLORS.subPrimary}
                        style={{
                            backgroundColor: 'transparent',
                            margin: 0,
                            marginRight: 5, 
                            opacity: data? 1 : 0, 
                            transform: [
                                {scaleX: data? 1 : 0}
                            ],
                        }}
                        onPressButton={handleClear}
                    />
                </View>
            </View>
        </View>
        <View style={{width: width, paddingHorizontal: 30}}>
            <UserFeed onPress={() => navigation.navigate('GiftMessage')}/>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        backgroundColor: COLORS.white
    },

    container: {
        width: width-60,
        height: 50,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        // position: 'absolute',
        marginTop: 55,
        marginBottom: 15,
        // opacity: 0.5
        zIndex: 2
    },

    inputContainer: {
        width: width-60-48,
        marginLeft: 10,
        marginRight: 5,
        height: 46,
        backgroundColor: COLORS.mainBackground,
        borderRadius: 50,
        justifyContent: 'center',
        // borderBottomWidth: 0.2,
        borderColor: COLORS.grey,
    },

    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        position: 'absolute',
        right: 0,
        zIndex: 2,
    },
})