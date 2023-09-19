import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import { BarCodeScanner} from 'expo-barcode-scanner';
import BoundBox from '../atoms/BoundBox';


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function CodeScanner({setScanner}) {

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

  return (
    <View>

    {setScanner && <View style={styles.container}>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
      <View style={styles.scannerContainer}>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >

          <BoundBox boxHeight={sizeHeight} boxWidth={sizeWidth} top={boundY} left={boundX}/>

        </BarCodeScanner>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      </View>

      <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, textAlign: 'center', marginTop: 40, marginBottom: 20 }}>{`Richten Sie den QR-Code innerhalb des Rahmens aus.`}</Text>

      {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
    
    </View>}

    </View>
  )
}

const styles = StyleSheet.create({

    container: {
      width: 363,
      height: 489,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },

    scannerContainer: {
      width: 363,
      height: 290,
      overflow: 'hidden'
    },

})