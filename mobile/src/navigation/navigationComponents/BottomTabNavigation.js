import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavIcons, {icons} from './NavIcons'

const tabIcons = [
    {ico: 'rocket-sharp', type: icons.Ionicons, routeName: 'RootDiscover', label: 'Entdecken' },
    {ico: 'ticket-percent', type: icons.MaterialCommunityIcons, routeName: 'RootCoupons', label: 'Coupons'},
    {ico: 'map-marker', type: icons.MaterialCommunityIcons, routeName: 'RootFinder', label: 'Finder'},
    {ico: 'ios-browsers', type: icons.Ionicons, routeName: 'RootStores', label: 'Stores'}

]

export default function BottomTabNavigation({navigation, focusIcon}) {
    const [focused, setFocused] = useState(''); 
    const navigate = (routeName) => routeName !== '' ? navigation.navigate(routeName) : null;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setFocused(focusIcon);
        })
        return () => unsubscribe;
      }, [navigation])
    return (
        <View style={styles.tabNavigationContainer}>
            {tabIcons.map((item, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => {
                        setFocused(item.ico);
                        navigate(item.routeName);
                    }}
                    style={styles.touchArea}
                >
                    <NavIcons icon={item.type} iconName={item.ico} iconColor={focused === item.ico ? 'black' : 'rgb(137, 137, 137)'} iconSize={24}/>
                    <Text style={[styles.labelStyle, {color: focused === item.ico ? 'black' : 'rgb(137, 137, 137)'}]}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabNavigationContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingBottom: 30,
        paddingTop: 10,
    },

    touchArea: {
        width: 50,
        height: 50,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },

    labelStyle: {
        fontFamily: 'Roboto-Medium', 
        fontSize: 10, 
        //fontWeight: 'bold',
        marginTop: 5,
    }
})