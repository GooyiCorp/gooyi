import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import BigButton from '../../components/components_LogIn/BigButton'
import OnboardingSlider from '../../components/components-onboarding-screen/OnboardingSlider'
import onboardingSliderData from '../../constants/onboardingSliderData'

export default function Onboarding() {

  const listRef = useRef(null)
  return (
    <View style={styles.screen}>
      
      <FlatList
                ref={listRef}
                data={onboardingSliderData}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <OnboardingSlider item={item} index={index} />
                    )
                }}
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                // onScroll={handleScroll}
                // onViewableItemsChanged={handleGetIndex}
            />
      <OnboardingSlider/>

      {/* -------------------------------------------------------------------- Start Button */}
      <BigButton

        // Base
        title={"Los geht's"}
        bgStyle={{
            backgroundColor: COLORS.primary,
            position: 'absolute',
            bottom: 30,
            zIndex: 2,
        }}                
        titleStyle={{
            color: COLORS.white, 
            fontFamily: 'Roboto-Medium',
        }}

        // Call handle
        onPress={() => null}
        //handleSendLink
      />
    </View>
  )
}

const styles = StyleSheet.create({

  screen: {
    height: height,
    width: width,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  }

})