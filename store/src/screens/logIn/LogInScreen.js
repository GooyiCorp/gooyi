import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Helpers
import { height, width } from '../../helper/constants/size'
import { COLORS } from '../../helper/constants/colors'
import { T2 } from '../../helper/constants/text'
// Components
import BigButton from '../../components/universal/Buttons/BigButton'
import InputLogIn from '../../components/components_LogIn/Input_LogIn/InputLogIn'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function LogInScreen() {
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
<View style={styles.screen}>
    <InputLogIn 
        // error Message
        errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
        errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}
        // check Algorithm
        checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
        // label
        label={'E-Mail'}
        // Result 
        checkSuccess={() => console.log(true)}
        checkFailed={() => console.log(false)}
        // Secure text
        secureTextEntry={false}
    />
    <InputLogIn 
        // error Message
        errorMessageCaseEmpty={'Das Feld darf nicht leer sein!'}
        errorMessageDataValidity={'Die eingegebene E-Mail-Addresse ist ungültig!'}
        // check Algorithm
        checkAlgorithm={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
        // label
        label={'Passwort'}
        // Result 
        checkSuccess={() => console.log(true)}
        checkFailed={() => console.log(false)}
        // Secure text
        secureTextEntry={true}
    />
    <BigButton label={'Anmelden'}/>
</View>
)
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({

    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 30,
    },

})