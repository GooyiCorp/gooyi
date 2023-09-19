import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { BarCodeScanner} from 'expo-barcode-scanner';
import BoundBox from '../../components/atoms/BoundBox';

export default function Scanner() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [boundX, setBoundX] = useState(0)
  const [boundY, setBoundY] = useState(0)
  const [sizeWidth, setSizeWidth] = useState(0)
  const [sizeHeight, setSizeHeight] = useState(0)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (context, type, data) => {
    //setScanned(true);
    const {origin, size} = context.bounds
    setBoundX(origin.x)
    setBoundY(origin.y)
    setSizeHeight(size.height)
    setSizeWidth(size.width)
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
          style={StyleSheet.absoluteFillObject}
        >
          
        {/* BoundBox */}
        <BoundBox boxHeight={sizeHeight} boxWidth={sizeWidth} top={boundY} left={boundX}/>

        </BarCodeScanner>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    
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
