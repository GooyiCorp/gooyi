import React from 'react'
import {View, Text} from 'react-native'

const Header = (props) => {
    return (
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {props.name}
            </Text>
        </View>
    )
}

export default Header