import React from 'react'
import {View, Text} from 'react-native'

const Header = (props) => {
    return (
        <View>
            <Text style={{fontFamily: 'Roboto-Medium', fontSize: 28, fontWeight: 'bold'}}>
                {props.name}
            </Text>
        </View>
    )
}

export default Header