import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import Icons, { icons } from '../../components_universal/Icons'
import PointIcon from '../../components_universal/PointIcon'
import { H3, H4, T1, T2, T3, T4 } from '../../../constants/text-style'
import RoundButton from '../../components_universal/RoundButton'
import IconLabelButton from '../../components_universal/IconLabelButton'
import { useDispatch } from 'react-redux'
import { decreasePoint } from '../../../redux/slices/pointSlice'

export default function RewardCard({
    title,
    information,
    price,
    type,
    currentPoint,
}) {
    const dispatch = useDispatch()
    
    const handleGetButton = () => {
        if (currentPoint - price >= 0) {
            dispatch(decreasePoint(price))
        }
    }

  return (
    <View style={styles.card}>
        {/* Info Button */}
        <Icons
            icon={icons.Ionicons}
            iconName={'ios-information-circle-outline'}
            iconSize={20}
            iconColor={COLORS.grey}
            iconStyle={{
                position: 'absolute',
                top: 5,
                right: 5, 
            }}
        />
        {/* Reward Information Section */}
        <View style={{flexDirection: 'row', margin: 5}}>
            {/* Reward Type */}
            <Icons
                icon={icons.MaterialCommunityIcons}
                iconName={type}
                iconSize={20}
                iconColor={COLORS.grey}
            />
            {/* Reward Info */}
            <View style={{marginLeft: 10}}>
                {/* Title  */}
                <Text style={[T1, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>{title}</Text>
                {/* Information */}
                <Text style={[T2, {fontFamily: 'RH-Medium', color: COLORS.grey}]}>{information}</Text>
            </View>
        </View>
        {/* Get Reward Section */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            {/* Price */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                {/* Points */}
                <Text style={[H3, {fontFamily: 'RH-Bold', color: COLORS.grey}]}>{price}</Text>
                {/* Coin Icon */}
                <PointIcon style={{marginLeft: 5, backgroundColor: COLORS.primary}}/>
            </View>
            {/* Get Button */}
            <View>
                <IconLabelButton 
                label={'Einlösen'}
                style={{
                    backgroundColor: COLORS.ivoryDark,
                    paddingHorizontal: 15,
                }}
                labelStyle={{
                    fontFamily: 'RH-Medium',
                    color: COLORS.grey
                }}
                onPressButton={handleGetButton}
                />
            </View>    
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: width-60,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        padding: 10,
        marginBottom: 10
    },

    text: {
        color: COLORS.grey,
        fontFamily: 'RH-Medium',
    }
})