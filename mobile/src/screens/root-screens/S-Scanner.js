import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { BarCodeScanner} from 'expo-barcode-scanner';
import BoundBox from '../../components/atoms/BoundBox';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, withSpring, withSequence, withDelay, Easing} from 'react-native-reanimated';

export default function Scanner() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataTest, setDataTest] = useState(false);
  
  const [boundX, setBoundX] = useState(0)
  const [boundY, setBoundY] = useState(0)
  const [sizeWidth, setSizeWidth] = useState(0)
  const [sizeHeight, setSizeHeight] = useState(0)

  const [dataReturn, setDataReturn] = useState()
  
  const boundValue = useSharedValue(0)

  const showBound = useAnimatedStyle(() =>{
    const scale = interpolate(boundValue.value, [0, 1, 2], [1.5, 1, 1])
    const opacity = interpolate(boundValue.value, [0, 1, 2], [0, 1, 0])
        return {
            transform:[
                {scale: scale}
            ],
          opacity: opacity
        }
    }
  )

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (context, type) => {
    //setScanned(true);
    setDataTest(true)
    const {origin, size} = context.bounds
    const data = context.data
    boundValue.value = withSequence(withTiming(1, {duration: 500, easing: Easing.bezier(0.03, 0.68, 0.5, 1.13)}), withDelay(300, withTiming(2, {duration: 300})), withTiming(0, {duration: 0}) )
    setBoundX(origin.x)
    setBoundY(origin.y)
    setSizeHeight(size.height)
    setSizeWidth(size.width)
    
    
    //console.log(data)

    setDataReturn(data)

    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //console.log(context)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
return (
    <View style={styles.contentContainer}>

      {/* Justify Container ------------------------------------------- */}
      <View style={styles.userNameContainer}>
      </View>

      {/* Main Container ------------------------------------------------ */}
      <View style={styles.mainContainer}>
        
        {/* BarCodeSacnner */}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          on
          style={StyleSheet.absoluteFillObject}
        >
          
        {/* BoundBox */}
        <Animated.View style={[{opacity: 0},showBound]}>
        <BoundBox showBoundingBox boxHeight={sizeHeight} boxWidth={sizeWidth} top={boundY} left={boundX}/>
        </Animated.View>

        {/* Data Box */}
        {dataTest && <TouchableOpacity style={{backgroundColor: '#ffffff', borderRadius: 50, opacity: 0.5, position: 'absolute', justifyContent: 'center', alignItems: 'center', margin: 10}} onPress={() => setDataTest(false)}>
          <Text style={{margin: 10}}>{dataReturn}</Text>
        </TouchableOpacity>}

        </BarCodeScanner>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => (setScanned(false), boundValue.value=0)} />}
    
      </View>


      {/* Direction Container -------------------------------------------- */}
      <View style={styles.directionContainer}>
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>{`Richten Sie den QR-Code innerhalb des Rahmens aus.`}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  
  userNameContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    // backgroundColor: 'green',
  },

  mainContainer: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    // backgroundColor: 'blue',
  },
  
  directionContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  contentContainer: {
    height: 488,
    width: 363,
    backgroundColor: '#ffffff',
  },

})
