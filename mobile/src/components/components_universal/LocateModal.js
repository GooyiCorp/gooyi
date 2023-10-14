import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../constants/size'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withSpring, runOnJS, useAnimatedStyle, interpolate, Extrapolate, withTiming, Easing } from 'react-native-reanimated'
import NavBackButton from '../atoms/NavBackButton'
import { COLORS } from '../../index/constantsindex'
import RoundButton from './RoundButton'
import Icons, { icons } from './Icons'
import { moderateScale } from '../../helper/scale'


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LocateModal({
    onClose
}) {

// Animation -----------------------------------------------------------------------------------------------------------

    // Value ----------------------------------------------------------
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})

    // handle Close ---------------------------------------------------
    const closeButton = () => {
        translateY.value = withSpring(0, {damping: 15})
        onClose()
    }

    // handle Gesture -------------------------------------------------
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value}
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y 
        translateY.value = Math.max(translateY.value, -0.4*height)
    })
    .onEnd(() => {
        if (translateY.value > -(0.5*height)/2.5) {
            translateY.value = withTiming(0, {duration: 400, easing: Easing.bezier(0.49, 1.19, 0.79, 1.02)})
            runOnJS(onClose)()
        }
        else {
            translateY.value = withTiming(-0.4*height, {duration: 400,
                easing: Easing.bezier(0.49, 1.19, 0.79, 1.02)})
        }
    })

    // handle Animation ------------------------------------------------
        // background Animation
        const bgStyle = useAnimatedStyle(() => {
            const opacity = interpolate(translateY.value,[0, -0.4*height], [0, 1])
            return {
                opacity: opacity
            }
        })

        // position Update
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value}]
            }
        })

        // start Animation
        useEffect(()=>{
            translateY.value = withTiming(-0.4*height, {duration: 400,
                easing: Easing.bezier(0.49, 1.19, 0.79, 1.02),})
        }, [])

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bgContainer, bgStyle]}>
        
        {/* Modal Container ---------------------------------------------------- */}
        <Animated.View style={[styles.modalContainer, animatedStyle]}>

            {/* -------------------------------------------------------------------- Line */}
            <View style={styles.line}></View>
            
            {/* -------------------------------------------------------------------- Close Button */}
            <View style={styles.closeButtonContainer}>
                <RoundButton 
                icon={icons.MaterialIcons}
                iconName={'close'}
                iconSize={moderateScale(22,0.2)}
                iconColor={COLORS.white}
                style={{
                    backgroundColor: COLORS.grey,
                    height: moderateScale(34,0.2),
                    width: moderateScale(34,0.2),
                }}
                onPressButton={closeButton}
            />
            </View>
            
            {/* -------------------------------------------------------------------- Top Section */}
            <View style={styles.topSectionContainer}>
                <Text style={styles.titleDefaultStyle}>Standort</Text>
                <View style={{width: width-60, height: 1, backgroundColor: COLORS.subPrimary02}}></View>
            </View>



            <View style={styles.midSectionContainer}>

            

            {/* <NavBackButton onPressBack={closeButton}/> */}

            <View style={{flexDirection: 'row', justifyContent: 'space-between', top: 30}}>
                <View style={styles.iconContainer}>
                    <RoundButton
                        icon={icons.Entypo}
                        iconName={'list'}
                        iconSize={moderateScale(30,0.2)}
                        iconColor={COLORS.subPrimary}
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                        }}
                    />
                    <Text style={styles.descriptionStyle}>Alle Städte {"\n"}durchsuchen</Text>
                </View>

                <View style={styles.iconContainer}>
                <RoundButton
                    icon={icons.Ionicons}
                    iconName={'ios-navigate'}
                    iconSize={moderateScale(24,0.2)}
                    iconColor={COLORS.subPrimary}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30
                    }}
                />
                <Text style={styles.descriptionStyle}>Aktuelle Position{"\n"}verwenden</Text>
                </View>
                
                <View style={styles.iconContainer}>
                <RoundButton
                    icon={icons.Entypo}
                    iconName={'plus'}
                    iconSize={moderateScale(30,0.2)}
                    iconColor={COLORS.subPrimary}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                    }}
                />
                <Text style={styles.descriptionStyle}>Neue Adresse{"\n"}hinzufügen</Text>
                </View>


            </View>
            </View>
            
        </Animated.View>

        {/* Close Button ------------------------------------------------------- */}
        <Pressable style={{flex: 1}} onPress={closeButton}/>

    </Animated.View>
    </GestureDetector>
  )
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    
    line:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 2
    },

    modalContainer: {
        height: 0.5*height,
        width: width,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        position: 'absolute',
        bottom: -0.5*height,
        zIndex: 1,
        justifyContent: 'flex-start',
        overflow: 'hidden'
    },

    bgContainer: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1,
        position: 'absolute'
    },

    closeButtonContainer: {
        width: width,
        //backgroundColor: 'yellow',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
    },

    midSectionContainer: {
        height: (0.4*height)/2,
        width: width,
        //backgroundColor: COLORS.subPrimary02,
        //marginHorizontal: 30,
        paddingHorizontal: 30,
        marginVertical: 10,
    },

    titleDefaultStyle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 10,
    },

    searchBox: {
        height: 42,
        width: width-60,
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: COLORS.subPrimary02
    },

    topSectionContainer: {
        width: width,
        // backgroundColor: 'yellow',
        paddingHorizontal: 30,
        justifyContent: 'flex-end'
    },

    iconContainer: {
        height: 100,
        width: 100,
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },

    descriptionStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: moderateScale(13,0.2), 
        color: COLORS.subPrimary, 
        marginTop: moderateScale(5,0.2),
        textAlign: 'center'
    }
})