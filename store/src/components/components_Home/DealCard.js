import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../helper/constants/colors'
import { T1 } from '../../helper/constants/text'
import StatusBadge from '../universal/Badge/StatusBadge'
import Icons, { icons } from '../universal/Icons/Icons'

export default function DealCard() {

    return (
        <View 
            style={{
                width: 280, 
                height: 240, 
                borderWidth: 0.5, 
                borderRadius: 16, 
                borderColor: COLORS.grey,
                // overflow: 'hidden',
            }}
        >
            
            {/* ---- start - Image Section */}
            <View
                style={{
                    width: '100%',
                    height: 140,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image 
                    source={require('../../../assets/image/Pizza.png')}
                    resizeMode='contain'
                    style={{maxWidth: '100%'}}
                />
            </View>
            {/* ---- end - Image Section */}

            {/* ---- start - Info Section */}
            <View 
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10
                }}
            >
                <Text style={[T1, {fontFamily: 'RH-Bold'}]}>20% Rabatt auf 2 Bubble Tea bei Tokas Tea House</Text>
                
            </View>
            {/* ---- end - Info Section */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 10,
                right: 0,
                paddingLeft: 12,
                paddingRight: 10
            }}>

            <StatusBadge 
                status={'Pausiert'}
                styleContainer={{
                    // marginRight: 10
                    // bottom: 0,
                    // left: 12,
                }}
            />

            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={'square-edit-outline'}
                iconSize={25}
                iconColor={COLORS.grey}
                // iconStyle={{
                //     position: 'absolute',
                //     bottom: 10,
                //     right: 10,
                // }}
            />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({})