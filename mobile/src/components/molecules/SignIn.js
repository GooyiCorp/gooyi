import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, SafeAreaView, Modal } from 'react-native';
import { moderateScale, s, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { api_url } from '../../constants/api.js'
const dum = require('../../../assets/icons/dum.png');
export default SignIn = ({ onClose, homepage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [nullPassword, setNullPassword] = useState(false);
    const [nullEmail, setNullEmail] = useState(false);
    const [focus, setFocus] = useState(null);

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
                    // Alert.alert(
                    //     'Ooops! Irendwas ist schief gelaufen.',
                    //     'E-mail oder Passwort leider ungültig.',
                    //     [
                    //         {
                    //             text: 'OK',
                    //         },
                    //     ],
                    //     { cancelable: false }
                    // );     
                    setWrongPassword(true)
                }
                setPassword('');
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.formTitle}>Anmelden</Text>
            <View style={styles.formContainer}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={moderateScale(24)} color="#4A4A4A" />
                </TouchableOpacity>
                <View>
                    <View style={[styles.inputContainer, focus === 'email' && { backgroundColor: '#f4f4f4' }, (wrongEmail || nullEmail) && styles.falseInputField]}>
                        <Text style={[styles.label, wrongEmail && styles.falseLabel]}>E-mail</Text>
                        <TextInput style={styles.formInput} placeholder="example@email.com" onChangeText={setEmail} value={email} onFocus={() => setFocus('email')} onBlur={() => setFocus(null)} />
                    </View>
                    <View style={{ flexDirection: 'row', left: scale(30) }}>
                        <AntDesign name="exclamationcircleo" size={scale(11)} color="#B84058" style={[{ display: 'none' }, (wrongEmail || nullEmail) && { display: 'flex' }]} />
                        <Text style={[styles.falseAlert, (wrongEmail || nullEmail) && { display: 'flex' }]}>{nullEmail ? 'E-mail fehlt' : 'Die eingegebene E-Mail-Addresse existiert nicht'}</Text>
                    </View>
                </View>
                <View>
                    <View style={[styles.inputContainer, nullPassword && styles.falseInputField, focus === 'password' && { backgroundColor: '#f4f4f4' }]}>
                        <Text style={[styles.label, nullPassword && styles.falseLabel]}>Passwort</Text>
                        <TextInput style={styles.formInput} secureTextEntry={!showPassword} onChangeText={setPassword} value={password} onFocus={() => setFocus('password')} onBlur={() => setFocus(null)} />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#4A4A4A"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', left: scale(30) }}>
                        <AntDesign name="exclamationcircleo" size={scale(11)} color="#B84058" style={[{ display: 'none' }, nullPassword && { display: 'flex' }]} />
                        <Text style={[styles.falseAlert, nullPassword && { display: 'flex' }]}>Passwort fehlt</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.formButton} onPress={handleSignIn}>
                    <Text style={styles.formButtonText}>Anmelden</Text>
                </TouchableOpacity>
                <Button color={'#444444'} title='Passwort vergessen' />
                <Modal
                    visible={wrongPassword}
                    animationType='slide'
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
                                Noch <Text style={{ color: '#B84058', fontFamily: 'Roboto-Bold' }}>3</Text> Versuche.
                            </Text>
                            <TouchableOpacity>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: moderateScale(16), color: '#B84058', margin: moderateScale(20) }}>Erneut versuchen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    )
};

styles = StyleSheet.create({
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
        width: moderateScale(250),
        height: moderateScale(40),
        paddingHorizontal: 10,
        fontSize: moderateScale(15),
        justifyContent: 'center',
    },
    formButton: {
        backgroundColor: '#B84058',
        paddingVertical: 12,
        borderRadius: 21,
        marginTop: 20,
        width: moderateScale(229),
        height: verticalScale(40),
        justifyContent: 'center',
    },
    formButtonText: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: scale(11),
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
    },
    closeButton: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: '#F4F4F4',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: moderateScale(20),
        marginLeft: moderateScale(15),
    },
    label: {
        margin: scale(10),
        fontFamily: 'Roboto-Bold',
        fontSize: scale(11),
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: scale(10),
        height: verticalScale(50),
        width: scale(300),
        borderRadius: 16,
        borderColor: '#f4f4f4',
        borderWidth: 2,
    },
    eyeIcon: {
        padding: scale(10),
        position: 'absolute',
        right: scale(10),
    },
    falseInputField: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: scale(10),
        height: verticalScale(50),
        width: scale(300),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEC8C8',
    },
    falseLabel: {
        color: '#B84058',
    },
    falseAlert: {
        fontSize: scale(10),
        fontFamily: 'Roboto-Medium',
        color: '#B84058',
        display: 'none',
        marginLeft: scale(5),
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
        fontSize: moderateScale(12),
        textAlign: 'center',
        margin: scale(10),
    }
});