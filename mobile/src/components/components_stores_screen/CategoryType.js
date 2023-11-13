import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Icons, { icons } from '../components_universal/Icons'
import { COLORS } from '../../index/constantsindex'

export default function CategoryType({
    edge,
    type,
}) {

  return (
    <View style={{height: edge, width: edge, borderRadius: 8, overflow: 'hidden'}}>

        {/* Restaurant */}
        {type == 'restaurant' && <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFB756'}}>
            <Icons
                icon={icons.MaterialIcons}
                iconName={'restaurant'}
                iconSize={20}
                iconColor={COLORS.white}
            />
        </View>}

        {/* Coffee */}
        {type == 'coffee' && <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D1ABAA'}}>
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'coffee'}
                iconSize={20}
                iconColor={COLORS.white}
            />
        </View>}

    </View>
  )
}

const styles = StyleSheet.create({})


// { 
//     id: 0, 
//     type: icons.MaterialIcons,
//     ico: 'restaurant',
//     size: 22,
//     bgColor: '#FFB756'
//   },
//   { 
//     id: 1, 
//     type: icons.MaterialCommunityIcons,
//     ico: 'coffee',
//     size: 23,
//     bgColor: '#D1ABAA'
//   },
//   { 
//     id: 2, 
//     type: icons.MaterialCommunityIcons,
//     ico: 'gamepad-square',
//     size: 26,
//     bgColor: '#758a92'
//   },
//   { 
//     id: 3, 
//     type: icons.MaterialCommunityIcons,
//     ico: 'book',
//     size: 24,
//     bgColor: '#da6178'
//   },
//   { 
//     id: 4, 
//     type: icons.MaterialCommunityIcons,
//     ico: 'shopping',
//     size: 24,
//     bgColor: '#4a6c98'
//   },
//   { 
//     id: 5, 
//     type: icons.MaterialCommunityIcons,
//     ico: 'heart',
//     size: 23,
//     bgColor: '#c52b10'
//   },