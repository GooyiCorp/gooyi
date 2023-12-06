import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { height, width } from '../../../constants/size'
import { H1, H2, T1 } from '../../../constants/text-style'

// QR
import  {default as QR} from 'react-native-qrcode-svg';
import { COLORS } from '../../../index/constantsindex';
import BigButton from '../../components_LogIn/BigButton';
import RoundButton from '../../components_universal/RoundButton';
import { icons } from '../../components_universal/Icons';
import { moderateScale } from '../../../helper/scale';
import { useDispatch, useSelector } from 'react-redux';
import { setHideQueueSmall, setShowQueueAlert, setShowQueueSmall } from '../../../redux/slices/queueSlice';

export default function QueueOverview({}) {

    const dispatch = useDispatch()
    const joinedQueue = useSelector((state) => state.queue.joinedQueue)
    const userID = Math.random().toString()

    // useEffect(() => {
    //     if (!joinedQueue) {
    //         goBack()
    //         console.log('A')
    //     } 
    // }, [joinedQueue])


    const onPressGoBack = () => {
        // goBack()
        // if (joinedQueue) {
        //     dispatch(setShowQueueSmall())
        // }
    }

    const onPressLeaveQueue = () => {
        dispatch(setShowQueueAlert())
    }

  return (
    <View style={styles.container}>
            {/* Close Button */}
    <RoundButton
        icon={icons.Ionicons}
        iconName={'md-chevron-back'}
        iconSize={moderateScale(28,0.2)}
        iconColor={COLORS.mainBackground}
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
        onPressButton={onPressGoBack}
    />
                {/* Logo Section */}

                {/* Queue Position Section  */}
                <View style={{ alignItems: 'center', padding: 30, justifyContent:'center'}}>
                    <Text style={[H1, {textAlign: 'center'}]}>Danke für's warten!</Text>
                    <Text style={[T1, {marginTop: 20}]}>Du bist aktuell auf Position:</Text>

                <View style={{flexDirection: 'row', marginVertical: 30}}>
                    <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, marginRight: 15}}>
                        <Image 
                            source={require('../../../../assets/image/datbackhus.png')}
                            resizeMode='contain'
                            style={{
                                maxWidth: '80%',
                            }}
                        />  
                    </View>

                    <View style={styles.position}>
                        <Text style={[H2, {fontSize: 68}]}>15</Text>
                    </View>
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
                        backgroundColor: COLORS.ivoryDark,
                        position: 'absolute',
                        zIndex: 2,
                        bottom: 30,
                    }}
                    titleStyle={{
                        color: COLORS.grey
                    }}
                    onPress={onPressLeaveQueue}
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

    position: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    qrCodeContainer: {
        height: 180,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
      },
})