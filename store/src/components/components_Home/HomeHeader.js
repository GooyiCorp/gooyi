import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { width } from '../../helper/constants/size'
import { H4 } from '../../helper/constants/text'
import { COLORS } from '../../helper/constants/colors'
import Icons, { icons } from '../universal/Icons/Icons'

export default function HomeHeader() {
  return (
    <View style={{position: 'absolute', width: width}}>
        <View 
            style={{
                paddingHorizontal: 20,
                marginTop: 40,
                height: 70,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {/* Left View */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View 
                    style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        marginRight: 10
                    }}
                >
                    <Image 
                        source={require('../../../assets/image/GooyiLogo.png')}
                        resizeMode='contain'
                        style={{maxWidth: '100%'}} 
                    />
                </View>
                <Text style={[H4, {color: COLORS.grey}]}>Hallo Team!</Text>
            </View>
            {/* Right View */}
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Icons 
                    icon={icons.AntDesign}
                    iconName={'bells'}
                    iconSize={27}
                    iconColor={COLORS.grey}
                />

                {/* Logo Button */}
                <Pressable
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => console.log('navigate Profile')}
                >
                    <View 
                        style={{
                            height: 40, width: 40,
                            borderWidth: 0.5,
                            borderRadius: 12,
                            borderColor: COLORS.grey,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 15
                        }}
                    >
                        <Image 
                            source={require('../../../assets/image/LogoYoko.png')}
                            resizeMode='contain'
                            style={{maxWidth: '80%'}}
                        />
                    </View>
                    <Icons 
                        icon={icons.MaterialIcons}
                        iconName={'navigate-next'}
                        iconSize={20}
                        iconColor={COLORS.grey}
                        iconStyle={{
                            marginRight: -5
                        }}
                    />
                </Pressable>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})