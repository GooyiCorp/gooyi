import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { moderateScale, s, scale, verticalScale } from'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import {api_url} from '../../constants/api.js'

export default SignIn = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = async () => {
        const url = api_url + 'user/'
        // const url = "http://localhost:8000"
        console.log(url);
        try {
            const response = await axios.get(url);
            console.log(response.data);
        } catch(error) {
            console.log(error.message);
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
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>    
                    <TextInput style={styles.formInput} placeholder="example@email.com" onChangeText={setEmail} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Passwort</Text>    
                    <TextInput style={styles.formInput} secureTextEntry={!showPassword} onChangeText={setPassword}/>
                    <TouchableOpacity style={styles.eyeIcon} onPress={()=> setShowPassword((prev)=> !prev)}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#4A4A4A"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.formButton} onPress={handleSignIn}>
                    <Text style={styles.formButtonText}>Anmelden</Text>
                </TouchableOpacity>
                <Button color={'#B84058'} title='Passwort vergesser'/>
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
});