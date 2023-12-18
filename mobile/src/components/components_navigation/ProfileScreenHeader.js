import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
// Expo Vector Icons
import { Ionicons } from '@expo/vector-icons'

export default function ProfileScreenHeader({
    goBack,
    onPressGoBack,
    headerTitle,
    titleText,
    editButton,
    onPressEditButton
}) {

return (
    <View style={styles.subHeaderContainer}>

            {/* Go Back Button  */}
            {goBack && <TouchableOpacity style={styles.icon} onPress={onPressGoBack}>
                <Ionicons name="md-chevron-back" size={20} color="black" />
            </TouchableOpacity>}

            {/* Header Title */}
            {headerTitle && <Text style={styles.headerStyle}>{titleText}</Text>}

            {/* Edit Button */}
            {editButton && <TouchableOpacity style={styles.editButton} onPress={onPressEditButton}>
                <Text style={styles.buttonTextStyle}>Bearbeiten</Text>
            </TouchableOpacity>}

    </View>
)
}

const styles = StyleSheet.create({
    subHeaderContainer: {
        height: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'yellow',
        marginHorizontal: 30,
        marginVertical: 35,
        
    },

    icon: {
        width: 30,
        height: 30,
        backgroundColor: '#eeeeee',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        position: 'absolute',
        left: 0,
    },

    headerStyle: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        position: 'absolute'
    },

    editButton: {
        position: 'absolute',
        right: 0,
    },

    buttonTextStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        color: '#B84058'
    }
})