import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { H1, H2, T1 } from '../../../constants/text-style'

// QR
import  {default as QR} from 'react-native-qrcode-svg';
import { COLORS } from '../../../index/constantsindex';
import BigButton from '../../components_LogIn/BigButton';
import RoundButton from '../../components_universal/RoundButton';
import { icons } from '../../components_universal/Icons';
import { moderateScale } from '../../../helper/scale';

export default function QueueOverview({navigation: {goBack}}) {
    const userID = Math.random().toString()
  return (
    <View style={styles.container}>
            {/* Close Button */}
    <RoundButton
        icon={icons.Ionicons}
        iconName={'md-chevron-back'}
        iconSize={moderateScale(28,0.2)}
        iconColor={COLORS.white}
        style={{
            backgroundColor: COLORS.grey,
            height: moderateScale(38,0.2),
            width: moderateScale(38,0.2),
            margin: 0,
            position: 'absolute',
            top: 60,
            left: 30,
            zIndex: 2,
        }}
        onPressButton={() => goBack()}
    />
                {/* Logo Section */}
                    <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16}}>
                        <Image 
                            source={require('../../../../assets/image/datbackhus.png')}
                            resizeMode='contain'
                            style={{
                                maxWidth: '80%',
                            }}
                        />  
                    </View>
                {/* Queue Position Section  */}
                <View style={{ alignItems: 'center', padding: 30, justifyContent:'center'}}>
                    <Text style={[H1, {textAlign: 'center'}]}>Danke für's warten!</Text>
                    <Text style={[T1, {marginTop: 20}]}>Du bist aktuell auf Position:</Text>
                    <View style={styles.positionCircle}>
                        <Text style={[H2, {fontSize: 68}]}>15</Text>
                    </View>
                    <Text style={[T1]}>Geschätzte Wartezeit: <Text style={{fontFamily: 'RH-Bold', color: COLORS.primary}}>10 min.</Text></Text>
                    {/* <Text style={[T2, {marginTop: 20, textAlign: 'center'}]}>Bitte achte darauf, dass du dich nicht{"\n"}zu weit weg vom Laden entfernst!</Text> */}
                </View>
                {/* QR Section */}
                    <View style={styles.qrCodeContainer}>
                        <QR
                            value={userID}
                            size={160}
                            color={COLORS.black}
                            backgroundColor={COLORS.mainBackground}
                        />
                    </View>

                <BigButton
                    title={'Warteschlage verlassen'}
                    bgStyle={{
                        backgroundColor: COLORS.primary,
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 30,
                    }}
                    titleStyle={{
                        color: COLORS.white
                    }}
                />
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: COLORS.mainBackground,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },

    positionCircle: {
        width: 0.35*width,
        height: 0.35*width,
        // backgroundColor: COLORS.ivoryDark,
        borderRadius: width,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    qrCodeContainer: {
        height: 200,
        width: 200,
        // backgroundColor: COLORS.white,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      },
})