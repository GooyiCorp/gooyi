import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, Modal } from 'react-native';
import { moderateScale, s, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { api_url } from '../constants/api.js'

const Register = ({ onClose, homepage }) => {
    
 
    return (
    <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.title}>Registrieren</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={moderateScale(24)} color="#4A4A4A" />
        </TouchableOpacity>

    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(26),
        marginLeft: moderateScale(30),
        marginTop: moderateScale(30),
        alignSelf: 'flex-start',
    },
    redButton: {
        backgroundColor: '#B84058',
        paddingVertical: verticalScale(14),
        borderRadius: 30,
        marginTop: verticalScale(20),
        width: moderateScale(200),
    },
    redButtonText: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: moderateScale(13),
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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
    },
    label: {
        marginBottom: 0,
        fontFamily: 'Roboto-Bold',
        fontSize: scale(11),
        position: 'absolute',
        left: 0,
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
});


export default Register