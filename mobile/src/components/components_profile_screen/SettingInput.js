import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import Icons, { icons } from '../components_universal/Icons'
import RoundButton from '../components_universal/RoundButton'


export default function SettingInput({
    clearButton,
    isEditable,
    lock,

    // error Message
    errorMessageCaseEmpty,
    errorMessageDataValidity,

    // constant
    checkAlgorithm,
    label,

    //setExternData
    setInputData
}) {
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [data, setData] = useState('')

    // Main State
    const [error, setError] = useState(false)
    const [focus, setFocus] = useState(false)
    const [submit, setSubmit] = useState(false)

    // --------------------------------------- Check Validity
    const checkValidity = () => {
        const check = checkAlgorithm

        if (!check.test(data)) {
            setError(true)
            setSubmit(false)
            //onLeaveInput()
            return
        } else {
            setError(false)
            setSubmit(false)
            //onLeaveInput()

            // handle request
            //activateServerRequest()
            return
        }   
        
      }

    // --------------------------------------- handle Clear Button
    const handleClear = () => {
        setData('')
        setError(false)
        setFocus(false)
        // focusInput.value = withDelay(0, withTiming(0, {duration: 200}))

        Keyboard.dismiss()

        // onLeaveInput
        // onLeaveInput()
    }

    // --------------------------------------- handle Clear Button
    const handleOnFocus = () => {
        setFocus(true)
        // focusInput.value = withDelay(0, withTiming(1, {duration: 200}))

        // onFocusInput
        // onFocusInput()
    }

    // --------------------------------------- handle onChangeText
    const handleOnChangeText = (e) => {
        setError(false)
        setData(e)
    }

    // --------------------------------------- handle submit
    useEffect(() => {
        // Check Validity when submit is true, return error false or true
        submit? checkValidity() : null
    }, [submit])

  return (

    <View>

        

        {/* --------------------------------------- Input Box */}
        <View style={[
            styles.inputContainer,
            {
                borderColor: isEditable? (error? COLORS.primary : (focus? COLORS.subPrimary : COLORS.borderGrey)) : 'transparent',
                backgroundColor: isEditable? COLORS.white : COLORS.mainBackground,
            },
        ]}>
            
            {/* --------------------- Label */}
            <Text style={[styles.label, {color: isEditable? (error? COLORS.primary : (focus? COLORS.subPrimary : COLORS.borderGrey)) : COLORS.grey}]}>{label}</Text>

            {/* --------------------- Input */}
            <TextInput style={[styles.input, {color: !isEditable? COLORS.grey : COLORS.black}]}

                // Input Data
                value={data}
                onChangeText={(e) => {setData(e), setInputData(e)}}

                // onFocus Input
                onFocus={handleOnFocus}

                // onChangeText 
                onChange={handleOnChangeText}

                // Pass Data
                onSubmitEditing={() => setSubmit(true)}

                // Editable
                editable={isEditable}

                onBlur={() => setFocus(false)}

            />

            {/* --------------------- Right View */}
            <View 
                style={[
                    styles.rightView,
                    {zIndex: focus? 1 : 0}
                ]}
            >

                {/* Clear Button */}
                {clearButton && <RoundButton
                    icon={icons.Ionicons}
                    iconName={'close'}
                    iconSize={30}
                    iconColor={COLORS.subPrimary}
                    style={{
                        backgroundColor: 'transparent',
                        margin: 0,
                        opacity: focus? 1 : 0, 
                        transform: [
                            {scaleX: focus? 1 : 0}
                        ],
                    }}

                    // handle Clear
                    onPressButton={handleClear}
                />}

                {/* Lock Icon */}
                {lock && <Icons 
                    icon={icons.Ionicons}
                    iconName={'ios-lock-closed'}
                    iconSize={20}
                    iconColor={COLORS.borderGrey}
                />}
            </View>

        </View>

        {/* --------------------------------------- Error Message */}
        <View style={[styles.errorMessageContainer, {marginVertical: error? 5 : 0}]}>

            {/* Icon */}
            {error && <Icons
                icon={icons.MaterialIcons}
                iconName={'info-outline'}
                iconSize={15}
                iconColor={COLORS.primary}
            />}

            {/* Message */}
            <Text style={styles.errorText}>
                {error? (!data? errorMessageCaseEmpty : errorMessageDataValidity) : ''}
            </Text>

        </View>

        

    </View>
  )
}

const styles = StyleSheet.create({

    inputContainer: {
        height: 50,
        width: width-60,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.default,
        marginHorizontal: 30,
        // justifyContent: 'space-between',
        // overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        height: '100%',
        width: '100%',
        paddingTop: 10,
        backgroundColor: 'transparent',
        borderRadius: 16,
        fontFamily: 'RH-Regular',
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 50,
        zIndex: 1,
    },

    rightView: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
        zIndex: 2,
    },

    errorText: {
        fontFamily: 'RH-Medium',
        fontSize: 12,
        color: COLORS.primary,
        marginLeft: 5
    },

    errorMessageContainer: {
        width: width-60,
        marginHorizontal: 40,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    label: {
        paddingHorizontal: 10,
        fontFamily: 'RH-Medium',
        fontSize: 15*0.8,
        position: 'absolute',
        top: 4,
        left: 10,
        zIndex: 1,
    },
})