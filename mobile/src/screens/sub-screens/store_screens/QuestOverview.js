import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { height, width } from '../../../constants/size'
import { COLORS } from '../../../index/constantsindex'
import SettingHeader from '../../../navigation/navigationComponents/SettingHeader'
import { H1, H4, T3 } from '../../../constants/text-style'
import PointIcon from '../../../components/components_universal/PointIcon'
import AnimatedText from '../../../components/components_universal/pointCounter/AnimatedText'
import { useSelector } from 'react-redux'
import QuestFeed from '../../../components/components_stores_screen/quest/QuestFeed'

export default function QuestOverview({
  navigation: {goBack},
}) {
  const [headerHeight, setHeaderHeight] = useState(0)
  const point = useSelector((state) => state.point.point)
  const handleGoBack = () => {
    goBack()
  }
  return (
    <View style={styles.card}>
      {/* ------------------------------------------------------------- */}
      {/* Header Section */}
      {/* ------------------------------------------------------------- */}
      <View style={{paddingBottom: 30}} onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
        {/* Header Back Button */}
        <SettingHeader
          goBack
          onPressGoBack={handleGoBack}
          header
          headerText={'Meine Challenge'}
          iconStyle={COLORS.mainBackground}
        />    
        {/* Information Section */}
        <View style={{paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View>
            {/* Label */}
            <Text style={[T3, {color: COLORS.grey}]}>Meine Punkte</Text>
            {/* Points */}
            <View style={{flexDirection: 'row'}}>
                {/* <Text style={[H2, {color: COLORS.grey, marginRight: 5}]}>500</Text> */}
                <PointIcon style={{marginTop: 18, marginRight: 5}}/>
                <AnimatedText num={point} duration={1000}/>
            </View>
          </View>
          {/* Logo Box */}
          <View style={styles.logoBox}>
            <Image source={require('../../../../assets/image/datbackhus.png')} resizeMode='contain' style={{maxWidth: '80%'}}/>
          </View>
        </View>
      </View>
      {/* ------------------------------------------------------------- */}
      {/* Content Section */}
      {/* ------------------------------------------------------------- */}
      <View style={[styles.contentSection, {height: height-headerHeight}]}>
        <QuestFeed />
        <QuestFeed />
        <QuestFeed />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
  },

  logoBox: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },

  contentSection: {
    width: width,
    height: height,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 30
  }
})