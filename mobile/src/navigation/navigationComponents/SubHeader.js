import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import SearchBox from '../../components/atoms/SearchBox'
import { TopNavButton } from '../../components/atoms/TopNavButton'

import { Ionicons } from '@expo/vector-icons'

export default function SubHeader({
    search,
    topnavbutton,
    topnavbuttonlists,
    goBack,
    onPressGoBack,
    userID,
    idNumber,
    navigateButton,
    subHeaderContainerStyle
}) {
  return (
    <View style={[styles.subHeaderContainer, subHeaderContainerStyle]}>
        <View style={styles.subHeaderJustifyView}>
            {search && <SearchBox />}

            {goBack && <TouchableOpacity style={styles.icon} onPress={onPressGoBack}>
                <Ionicons name="md-chevron-back" size={20} color="black" />
            </TouchableOpacity>}

            {navigateButton && <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPressGoBack}>
                    <View style={[styles.icon, {backgroundColor: 'rgba(186, 186, 186, 0.2)', paddingTop: 2, paddingRight: 2}]}>
                        <Ionicons name="ios-navigate" size={20} color='#686868' />   
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, color: '#686868', marginRight: 5}}>Standort auswählen</Text>
                        <Ionicons name='chevron-down' size={16} color="#686868" />
                    </View>
                </TouchableOpacity>
            </View>}


            {topnavbutton && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                <TopNavButton lists={topnavbuttonlists}/>
            </ScrollView>}

            {userID && <Text style={styles.id}>Nutzer ID: <Text style={{fontFamily: 'Roboto-Light'}}>{idNumber}</Text></Text>}

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    subHeaderContainer: {
        height: 60,
        backgroundColor: '#fff',
        //paddingVertical: 5
        
    },
    
    subHeaderJustifyView: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 30,
        //backgroundColor: 'red',
    },

    icon: {
        width: 36,
        height: 36,
        backgroundColor: 'rgba(186, 186, 186, 0.2)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    id: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        marginLeft: 15,
    }
})