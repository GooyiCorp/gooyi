import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { moderateScale, scale, verticalScale } from '../helper/scale.js';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { api_url } from '../constants/api.js'
import { height, width } from '../constants/size.js';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated'
import { RedButton } from '../components/atoms/Button.js';
const dum = require('../../assets/icons/dum.png');
const SignIn = ({ onClose, homepage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [nullPassword, setNullPassword] = useState(false);
    const [nullEmail, setNullEmail] = useState(false);
    const [tries_left, setTries_left] = useState(null);
    const handleSignIn = async () => {
        if (password) setNullPassword(false)
        if (email) setNullEmail(false)
        if (password === '' || email === '') {
            if (email === '') {
                setNullEmail(true);
                return
            }
            if (password === '') setNullPassword(true);
        }
        const url = api_url + 'user/login/'
        try {
            const response = await axios.post(url, { email: email.toLowerCase(), password: password });
            if (response.data.success === true) homepage(true);
            else {
                if (response.data.error == 'email') setWrongEmail(true);
                if (response.data.error == 'password') {
                    if (password === '') {
                        setWrongEmail(false);
                        return;
                    }
                    setWrongEmail(false);
                    setWrongPassword(true)
                    setTries_left(response.data.data.tries_left)
                }
                if (response.data.error == 'OutOfTries') {
                    setWrongEmail(false);
                }
                setPassword('');
            }
        } catch (error) {
            console.log(error);
        }

    };
    // -- Animation ----------------------------------------------------------------
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})
    const closeButton = () => {
        translateY.value = withSpring(0, {damping: 15})
        onClose()
    }
    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value}
    })
    .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y 
        translateY.value = Math.max(translateY.value, -height)
    })
    .onEnd(() => {
        if (translateY.value > -height/1.3) {
            translateY.value = withSpring(0, {damping: 15})
            runOnJS(onClose)()
        }
        else {
            translateY.value = withSpring(-height, {damping: 15})
        }
    })
    const animatedStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [-height, -height+50],
            [0, 25], 
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{ translateY: translateY.value}]
        }
    })
    useEffect(()=>{
        translateY.value =withSpring(-height, {damping: 15})
    }, [])
    return (
        <GestureDetector gesture={gesture}>

        <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <View style={styles.line} />
            <Text style={styles.formTitle}>Anmelden</Text>
            <View style={styles.formContainer}>
                <TouchableOpacity onPress={closeButton} style={styles.closeButton}>
                    <Ionicons name="close" size={moderateScale(24)} color="#4A4A4A" />
                </TouchableOpacity>
                <View>
                    <View style={[styles.inputContainer, (wrongEmail || nullEmail) && styles.falseInputField]}>
                        <Text style={[styles.label]}>E-mail</Text>
                        <TextInput style={styles.formInput} placeholder="example@email.com" onChangeText={setEmail} value={email} />
                    </View>
                    <View>
                        <Text style={[styles.falseAlert, (wrongEmail || nullEmail) && { display: 'flex' }]}>{nullEmail ? 'E-mail fehlt' : 'Die eingegebene E-Mail-Addresse existiert nicht'}</Text>
                    </View>
                </View>
                <View>
                    <View style={[styles.inputContainer, nullPassword && styles.falseInputField]}>
                        <Text style={[styles.label]}>Passwort</Text>
                        <TextInput style={styles.formInput} secureTextEntry={!showPassword} onChangeText={setPassword} value={password} />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#4A4A4A"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center' }}>
                        <Text style={[styles.falseAlert, nullPassword && { display: 'flex' }]}>Passwort fehlt</Text>
                    </View>
                </View>
                <RedButton title="Anmelden" onPress={handleSignIn} />
                <TouchableOpacity style={{marginTop: verticalScale(12)}}>
                    <Text style={styles.vergessen}>Passwort vergessen</Text>
                </TouchableOpacity>
                <Modal
                    visible={wrongPassword}
                    animationType='fade'
                    transparent={true}
                >
                    <View style={styles.wrongPasswordModal}>
                        <View style={styles.wrongPasswordAlert}>
                            <TouchableOpacity onPress={() => setWrongPassword(false)} style={{ alignSelf: 'flex-start' }}>
                                <Ionicons name="arrow-back-circle-outline" size={scale(30)} color="black" style={styles.backButton} />
                            </TouchableOpacity>
                            <Image source={dum} style={{ width: moderateScale(80), height: moderateScale(71.68) }} />
                            <Text style={styles.wrongPasswordTitle}>Ooops! Irendwas ist schief gelaufen.</Text>
                            <Text style={styles.wrongPasswordDetail}>
                                E-mail oder Passwort leider ungültig. {'\n\n'}
                                Noch <Text style={{ color: '#B84058', fontFamily: 'Roboto-Bold' }}>{tries_left}</Text> Versuche.
                            </Text>
                            <TouchableOpacity onPress={()=>setWrongPassword(false)}>
                                <Text style={styles.vergessen}>Erneut versuchen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </Animated.View>


        </GestureDetector>
    )
};

const styles = StyleSheet.create({
    line:{
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
        height: 1.5*height,
        top: height,
        width: width
    },
    formContainer: {
        padding: scale(20),
        alignItems: 'center',
    },
    formTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(26),
        marginLeft: moderateScale(30),
        marginTop: moderateScale(30),
        alignSelf: 'flex-start',
    },
    formInput: {
        width: moderateScale(300),
        height: moderateScale(40),
        fontSize: moderateScale(15),
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    formButton: {
        backgroundColor: '#B84058',
        paddingVertical: verticalScale(14),
        borderRadius: 30,
        marginTop: verticalScale(20),
        width: moderateScale(200),
    },
    formButtonText: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
        textAlign: 'center',
    },
    vergessen: {
        color: '#B84058',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
    },
    closeButton: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: '#F4F4F4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: moderateScale(15),
    },
    label: {
        marginBottom: 0,
        fontFamily: 'Roboto-Bold',
        fontSize: scale(11),
        position: 'absolute',
        left: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: scale(10),
        height: verticalScale(50),
        width: moderateScale(350),
        borderColor: '#f4f4f4',
        borderBottomWidth: 2,
    },
    eyeIcon: {
        padding: scale(10),
        position: 'absolute',
        right: scale(5),
    },
    falseInputField: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: scale(10),
        height: verticalScale(50),
        width: scale(300),
        borderBottomWidth: 2,
        borderBottomColor: '#EEC8C8',
    },
    falseLabel: {
        color: '#B84058',
    },
    falseAlert: {
        fontSize: scale(10),
        fontFamily: 'Roboto-Medium',
        color: '#B84058',
        display: 'none',
        alignSelf: 'center',
    },


    // Wrong password
    wrongPasswordModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        justifyContent: 'flex-end'
    },
    wrongPasswordAlert: {
        backgroundColor: 'white',
        height: '50%',
        borderRadius: scale(16),
        alignItems: 'center',
    },
    backButton: {
        left: moderateScale(15),
        top: moderateScale(15),
    },
    wrongPasswordTitle: {
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: moderateScale(22),
        width: '60%',
        margin: scale(10)
    },
    wrongPasswordDetail: {
        fontFamily: 'Roboto-Regular',
        fontSize: moderateScale(13),
        textAlign: 'center',
        margin: scale(10),
        marginBottom: verticalScale(20)
    }
});


export default SignIn