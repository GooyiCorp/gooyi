import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../index/constantsindex'
import { width } from '../../constants/size'
import { T1, T2, T3, T4 } from '../../constants/text-style'
import BigButton from '../components_LogIn/BigButton'
import IconLabelButton from '../components_universal/IconLabelButton'
import Icons, { icons } from '../components_universal/Icons'

export default function LogInRequiredBox({
    onPress
}) {
  return (
    <View style={styles.contentBox}>
            <Icons 
                icon={icons.MaterialCommunityIcons}
                iconName={'archive-lock-outline'}
                iconSize={20}
                iconColor={COLORS.grey}
                iconStyle={{
                    position: 'absolute',
                    top: 8,
                    right: 10,
                  }}
            />
        <Text style={[T4, {textAlign: 'center', marginBottom: 15}]}>Du musst dich anmelden, um auf {"\n"}deine Coupons zugreifen zu können!</Text>

        <IconLabelButton 
              label={'Zur Anmeldung'}
              style={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: 30,
                alignSelf: 'center',
                // borderWidth: 0.5,
                // borderColor: COLORS.borderGrey,
              }}
              labelStyle={{
                fontFamily: 'RH-Medium',
                color: COLORS.white
              }}
              onPressButton={onPress}
            />
    </View>
  )
}

const styles = StyleSheet.create({
    contentBox: {
        width: width-60,
        height: 138,
        // backgroundColor: COLORS.ivory,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: COLORS.borderGrey,
        borderStyle: 'dashed',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      },
})