import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { moderateScale, s, scale, verticalScale } from'react-native-size-matters';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import {api_url} from '../../constants/api.js'

export default SignIn = ({ onClose, homepage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword ] = useState(false);
    const [nullPassword, setNullPassword] = useState(false);
    const [nullEmail, setNullEmail] = useState(false);
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
        const url = api_url + 'user/'
        try {
            const response = await axios.post(url, {email: email, password: password});
            if (response.data.success === true) homepage(true);
            else {
                console.log(response.data.error);
                if (response.data.error == 'email') setWrongEmail(true);
                if (response.data.error == 'password') {
                    Alert.alert(
                        'Ooops! Irendwas ist schief gelaufen.',
                        'E-mail oder Passwort leider ungültig.',
                        [
                            {
                                text: 'OK',
                            },
                        ],
                        { cancelable: false }
                    );                    
                }
                setEmail('');
                setPassword('');
            }
        } catch(error) {
            console.log(error);
        }
    
    };
    return (
        <View style={styles.modalContainer}>
            <View style={styles.formContainer}>
                <View style={styles.closeButtonWrapper}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A4A4A" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.formTitle}>Anmelden</Text>
                <View>
                    <View style={[styles.inputContainer, (wrongEmail || nullEmail) && styles.falseInputField]}>
                        <Text style={[styles.label, wrongEmail && styles.falseLabel]}>E-mail</Text>    
                        <TextInput style={styles.formInput} placeholder="example@email.com" onChangeText={setEmail} value={email}/>
                    </View>
                    <View style={{ flexDirection: 'row', left: scale(30) }}>
                        <AntDesign name="exclamationcircleo" size={scale(11)} color="#B84058" style={[{ display: 'none' }, (wrongEmail || nullEmail) && { display: 'flex' }]} />
                        <Text style={[styles.falseAlert, (wrongEmail || nullEmail) && {display: 'flex'}]}>{nullEmail ? 'E-mail fehlt' : 'Die eingegebene E-Mail-Addresse existiert nicht'}</Text>
                    </View>
                </View>
                <View>
                    <View style={[styles.inputContainer, nullPassword && styles.falseInputField]}>
                        <Text style={[styles.label, nullPassword && styles.falseLabel ]}>Passwort</Text>    
                        <TextInput style={styles.formInput} secureTextEntry={!showPassword} onChangeText={setPassword} value={password}/>
                        <TouchableOpacity style={styles.eyeIcon} onPress={()=> setShowPassword((prev)=> !prev)}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#4A4A4A"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', left: scale(30)}}>
                        <AntDesign name="exclamationcircleo" size={scale(11)} color="#B84058" style={[{display: 'none'},nullPassword && {display: 'flex'}]}/>
                        <Text style={[styles.falseAlert, nullPassword && {display: 'flex'}]}>Passwort fehlt</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.formButton} onPress={handleSignIn}>
                    <Text style={styles.formButtonText}>Anmelden</Text>
                </TouchableOpacity>
                <Button color={'#B84058'} title='Passwort vergessen'/>
            </View>
        </View>
    )
};

styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
    formTitle: {
        fontFamily: 'Roboto-Light',
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButton: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: '#F4F4F4',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonWrapper: {
        position: 'absolute',
        justifyContent: 'flex',
        width: '100%',
        marginTop: moderateScale(10),
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
        backgroundColor: '#f4f4f4',
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
        backgroundColor: '#f4f4f4',
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
});