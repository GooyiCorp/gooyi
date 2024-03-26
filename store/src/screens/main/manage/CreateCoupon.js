import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import ModalHeader from '../../../components/universal/Header/ModalHeader'
import { T1, T2, T4, T5 } from '../../../helper/constants/text'
import Icons, { icons } from '../../../components/universal/Icons/Icons'

export default function CreateCoupon({
    navigation: {goBack}
}) {
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>
        <ModalHeader 
            title={'Coupon erstellen'}
            onPress={() => goBack()}
        />
        <View 
            style={{
                marginTop: 20,
                paddingHorizontal: 25
            }}
        >
            <View style={{marginBottom: 20}}>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Coupon Titel</Text>
                <View style={{height: 40, borderBottomWidth: 0.5, borderBottomColor: COLORS.grey, marginTop: 5}}>

                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Zielgruppe</Text>
                <View style={{marginTop: 10, marginHorizontal: -5, flexDirection: 'row'}}>
                    <View style={{paddingHorizontal: 15, height: 40, backgroundColor: COLORS.grey, borderRadius: 10, alignSelf: 'flex-start', marginRight: 10, justifyContent: 'center'}}>
                        <Text style={[T2, {color: COLORS.white, fontFamily: 'RH-Medium'}]}>Auswählen</Text>
                    </View>
                    <View style={{paddingHorizontal: 15, height: 40, justifyContent: 'center', borderRadius: 10, alignSelf: 'flex-start', marginRight: 10, borderWidth: 0.5, borderColor: COLORS.grey}}>
                        <Icons 
                            icon={icons.AntDesign}
                            iconName={'plus'}
                            iconSize={30}
                            iconColor={COLORS.grey}
                        />
                    </View>
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Laufzeit</Text>
                <View style={{height: 40, borderBottomWidth: 0.5, borderBottomColor: COLORS.grey, marginTop: 5, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <Icons
                            icon={icons.AntDesign}
                            iconName={'calendar'}
                            iconSize={24}
                            iconColor={COLORS.grey}
                            iconStyle={{marginRight: 10, marginLeft: 5}}
                        />
                        <Icons
                            icon={icons.MaterialIcons}
                            iconName={'navigate-next'}
                            iconSize={22}
                            iconColor={COLORS.grey}
                        />
                    </View>
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Anzahl</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <View style={{height: 40, width: '50%', borderBottomWidth: 0.5, borderBottomColor: COLORS.grey}}>

                    </View>
                    <Text style={[T5, {color: COLORS.grey, marginLeft: 10}]}>Coupons</Text>
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Coupon Gültigkeit</Text>
                <View style={{height: 40, width: '50%', borderBottomWidth: 0.5, borderBottomColor: COLORS.grey, marginTop: 5, justifyContent: 'center'}}>
                    <Icons 
                        icon={icons.MaterialIcons}
                        iconName={'arrow-drop-down'}
                        iconSize={25}
                        iconColor={COLORS.grey}
                        iconStyle={{
                            alignSelf: 'flex-end',
                            marginRight: - 5
                        }}
                    />
                </View>
            </View>

            <View>
                <Text style={[T4, {textTransform: 'uppercase', color: COLORS.grey}]}>Beschreibung</Text>
                <View style={{height: 125, width: width-40, borderWidth: 0.5, borderColor: COLORS.grey, marginTop: 10, borderRadius: 10, marginLeft: -5}}>

                </View>
            </View>

        </View>

        <View style={{
            position: 'absolute', 
            zIndex: 6,
            bottom: 0,
            width: width, 
            paddingBottom: 90,
            paddingTop: 20, 
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity 
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: COLORS.primary,
                    borderRadius: height,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={[T1, {color: COLORS.white, fontFamily: 'RH-Bold'}]}>Zur Prüfung einreichen</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})