import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import PointCounter from '../../components/components_universal/pointCounter/PointCounter'
import ProgressBar from '../../components/components_universal/progressBar/ProgressBar'

export default function Loading( {navigation} ) {
  return (
    <View style={styles.screen}>
      <ProgressBar
        barWidth={250}
        barHeight={8}
        progressValue={100}
        maxProgressValue={100}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',

    },
})