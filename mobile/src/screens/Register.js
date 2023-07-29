import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, ScrollView, Alert, Pressable } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { api_url } from '../constants/api.js'
import { height, width } from '../constants/size.js';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, runOnJS, color } from 'react-native-reanimated'
import { GreyButton, RedButton, WhiteButton } from '../components/atoms/Button.js';

const Register = ({ onClose, homepage }) => {
    // -- Form handling ------------------------------------------------------------------
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [nachName, setNachName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = () => {
        console.log(email, name, nachName, password, confirmPassword);
        if (password!== confirmPassword) {
            Alert.alert('Passwörter stimmen nicht überein!')
        }
    }
    // -- Scrolling ------------------------------------------------------------------
    const slideRef = useRef()
    const [slideIndex, setSlideIndex] = useState(0)
    const handleScroll = (e) => {
        setSlideIndex(parseInt(e.nativeEvent.contentOffset.x/width));
    }
    const handleNext = () => {
        slideRef.current.scrollTo({ x: slideIndex*width + width, animated: true })
    }
    const handleJump = (index) => {
        slideRef.current.scrollTo({ x: index*width, animated: true })
    }
    // -- Animation ----------------------------------------------------------------
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const closeButton = () => {
        translateY.value = withSpring(0, { damping: 15 })
        onClose()
    }
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, -height)
        })
        .onEnd(() => {
            if (translateY.value > -height / 1.3) {
                translateY.value = withSpring(0, { damping: 15 })
                runOnJS(onClose)()
            }
            else {
                translateY.value = withSpring(-height, { damping: 15 })
            }
        })
    const animatedStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [-height, -height + 50],
            [0, 25],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translateY.value }]
        }
    })
    useEffect(() => {
        translateY.value = withSpring(-height, { damping: 15 })
    }, [])
    return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={styles.line} />
            <Text style={styles.title}>Registrieren</Text>
            <TouchableOpacity onPress={closeButton} style={styles.closeButton}>
                <Ionicons name="close" size={moderateScale(24)} color="#4A4A4A" />
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.indexContainer}>
                    <TouchableOpacity onPress={() => handleJump(0)}>
                        <Text style={[styles.index, slideIndex == 0 && styles.activeIndex]}>1</Text>
                    </TouchableOpacity>
                    <MaterialIcons name="keyboard-arrow-right" size={moderateScale(15)} color="#9b9b9b" />
                    <TouchableOpacity onPress={() => handleJump(1)}>
                        <Text style={[styles.index, slideIndex == 1 && styles.activeIndex]}>2</Text>
                    </TouchableOpacity>
                    <MaterialIcons name="keyboard-arrow-right" size={moderateScale(15)} color="#9b9b9b" />
                    <TouchableOpacity onPress={() => handleJump(2)}>
                        <Text style={[styles.index, slideIndex == 2 && styles.activeIndex]}>3</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={slideRef}
                    horizontal={true}
                    pagingEnabled={true}
                    snapToAlignment='center'
                    onScroll={(e) => handleScroll(e)}
                    scrollEventThrottle={16}
                >
                     <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Gib deine Email-Adresse ein</Text>
                        <TextInput style={styles.input} onChangeText={setEmail}/>
                        <Text style={styles.label}>Deine Email-Adresse</Text>
                        <GreyButton title={'Weiter'} style={{ position: 'absolute', top: verticalScale(400) }} onPress={handleNext} />
                     </View>
                     <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Verrate uns deinen Namen</Text>
                        <TextInput style={styles.input} onChangeText={setName}/>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} onChangeText={setNachName} />
                        <Text style={styles.label}>Nachname</Text>
                        <GreyButton title={'Weiter'} style={{ position: 'absolute', top: verticalScale(400) }} onPress={handleNext} />
                     </View>
                     <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Passwort festlegen</Text>
                        <View>
                            <TextInput style={styles.input} secureTextEntry={showPassword} onChangeText={setPassword}/>
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#4A4A4A"
                                />
                            </TouchableOpacity>
                        </View>
                            <Text style={styles.label}>Passwort</Text>
                        <View>
                            <TextInput style={styles.input} secureTextEntry={showPassword} onChangeText={setConfirmPassword}/>
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#4A4A4A"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Passwort wiederholen</Text>
                            <Text style={styles.term}>Wenn du dich registrieren, akzeptierst du damit unsere <Text style={styles.redTerm}>Nutzungbedingungen</Text> und unsere <Text style={styles.redTerm}>Datenschutzerklarun</Text></Text>
                        <RedButton title={'Registrieren'} style={{ position: 'absolute', top: verticalScale(400) }} onPress={handleSubmit} />
                     </View>
                     
                </ScrollView>
            </View>
        </Animated.View>
    </GestureDetector>
    )
};

const styles = StyleSheet.create({
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 25,
        height: 1.5 * height,
        top: height,
        width: width
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(26),
        marginLeft: moderateScale(30),
        marginTop: moderateScale(30),
        alignSelf: 'flex-start',
    },
    closeButton: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: '#F4F4F4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: moderateScale(30),
        marginTop: moderateScale(20),
    },
    container: {
        
    },
    indexContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: moderateScale(15),
    },
    index: {
        fontFamily: 'Roboto-Black',
        color: '#d8d8d8',
        fontSize: moderateScale(15),
        marginHorizontal: moderateScale(10),
    },
    activeIndex: {
        fontFamily: 'Roboto-Black',
        fontSize: moderateScale(15),
        marginHorizontal: moderateScale(10),
        color: '#b84058'
    },
    slide: {
        alignItems: 'center',
        width: width
    },
    slideTitle: {
        fontFamily: 'Roboto-Black',
        fontSize: moderateScale(15),
        marginVertical: verticalScale(30)
    },
    input: {
        height: verticalScale(50),
        width: moderateScale(300),
        borderColor: '#f4f4f4',
        borderBottomWidth: 2,
        fontSize: moderateScale(15),
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: moderateScale(30),
        marginVertical: verticalScale(5)
    },
    eyeIcon: {
        position: 'absolute',
        top: verticalScale(20),
        right: moderateScale(10),
    },
    term: {
        fontFamily: 'Roboto-Regular',
        fontSize: moderateScale(11),
        position: 'absolute', top: verticalScale(370)
    },
    redTerm: {
        fontFamily: 'Roboto-Bold',
        color: '#c83356'
    }
});


export default Register