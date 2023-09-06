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
}) {
  return (
    <View style={styles.subHeaderContainer}>
        <View style={styles.subHeaderJustifyView}>
            {search && <SearchBox />}

            {goBack && <TouchableOpacity style={styles.icon} onPress={onPressGoBack}>
                <Ionicons name="md-chevron-back" size={20} color="black" />
            </TouchableOpacity>}

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
        height: 50,
        backgroundColor: '#fff',
        
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
        width: 30,
        height: 30,
        backgroundColor: '#eeeeee',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },

    id: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        marginLeft: 15,
    }
})