import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../constants/size'
import { MainHeader, SubHeader } from '../../../index/navIndex'
import { COLORS } from '../../../index/constantsindex'
import { H1, H2, T1, T2, T3 } from '../../../constants/text-style'
import StoreInfo from '../../../components/components_stores_screen/StoreInfo'
import Icons, { icons } from '../../../components/components_universal/Icons'
import PointIcon from '../../../components/components_universal/PointIcon'
import BigButton from '../../../components/components_LogIn/BigButton'
import IconLabelButton from '../../../components/components_universal/IconLabelButton'
import PresentationHeader from '../../../components/components_universal/PresentationHeader'
import NewOfferBox from '../../../components/components_discover_screen/NewOfferBox'
import QuestFeed from './QuestFeed'

export default function StoreEntry() {
  return (
    <View style={{height: height, width: width, backgroundColor: COLORS.white}}>

        {/* ----------------------------- Header Image */}
        <View style={styles.headerImgContainer}></View>

        {/* ----------------------------- Main Section */}
        <View style={styles.contentSection}>
            {/* Join Queue Button */}
            <BigButton 
                title={'Warteschlage beitreten'}
                bgStyle={{
                    backgroundColor: COLORS.primary,
                    position: 'absolute',
                    zIndex: 2,
                    bottom: 30,
                }}
                titleStyle={{
                    color: COLORS.white
                }}
                onPress={() => console.log('join queue')}
            />  
        {/* ------------- Scroll View */}
        <ScrollView>

            {/* --------- Header Section */}
            <View style={{marginHorizontal: 30, marginTop: 30}}>
                {/* Store Name */}
                <Text style={H1}>Dat Backhus</Text>
                {/* Address */}
                <Text style={T2}>Bahnhofsplatz 42, 22195 Bremen</Text>
                {/* Follower */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <Icons 
                        icon={icons.MaterialIcons}
                        iconName={'favorite'}
                        iconSize={16}
                        iconColor={COLORS.primary}
                    />
                    <Text style={[T2, {marginLeft: 5}]}>20</Text>
                </View>
                {/* Description */}
                <Text style={[T1, {marginTop: 20}]}>Frische handgemachte Brötchen, Kuchen und Gebäcke.</Text>
                {/* Opening hours */}
                <View style={{marginTop: 10}}>
                    {/* Left Section */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icons 
                            icon={icons.Ionicons}
                            iconName={'ios-time'}
                            iconSize={16}
                            iconColor={COLORS.grey}
                        />
                        <Text style={[T2, {marginLeft: 5}]}>10:00 - 20:00</Text>
                    </View>
                    {/* Right Section */}

                </View>
            </View>

            {/* --------- Point Section */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30}}>
                {/* Left Section */}
                <View>
                    {/* Label */}
                    <Text style={[T3, {color: COLORS.grey}]}>Meine Punkte</Text>
                    {/* Points */}
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[H2, {color: COLORS.grey, marginRight: 5}]}>500</Text>
                        <PointIcon style={{marginTop: 18}}/>
                    </View>
                </View>
                {/* Right Section */}
                <IconLabelButton
                    label={'Prämienliste'}
                    icon={icons.MaterialCommunityIcons}
                    iconName={'gift'}
                    iconSize={18}
                    iconColor={COLORS.grey}
                    style={{
                        backgroundColor: COLORS.ivoryDark,
                        height: 50,
                        paddingHorizontal: 25,
                        borderRadius: 16,
                        alignSelf: 'flex-end',
                    }}
                    labelStyle={{
                        marginLeft: 5,
                        color: COLORS.grey,
                        fontFamily: 'RH-Medium'
                    }}
                    innerContainerStyle={{
                        alignItems: 'baseline'
                    }}
                    onPressButton={() => console.log('open Modal')}
                />
            </View>

            {/* --------- Challenge Section */}
            <View style={{marginTop: 20}}>
                {/* Header */}
                <PresentationHeader
                    title={'Herausforderungen'}
                />
                {/* Quests */}
                <View style={{marginHorizontal: 30}}>
                    <QuestFeed />
                    <QuestFeed />
                    <QuestFeed />
                </View>
            </View>

            {/* --------- New Offers Section */}
            <View style={{marginTop: 20}}>
                {/* Header */}
                <PresentationHeader
                    title={'Aktuelle Angebote'}
                />
                {/* New Offers */}
                <View style={{marginHorizontal: 30}}>
                    <NewOfferBox />
                </View>
            </View>

            {/* --------- Feedback Section */}
            <IconLabelButton
                    label={'Feedback und Anregungen'}
                    icon={icons.MaterialCommunityIcons}
                    iconName={'email'}
                    iconSize={24}
                    iconColor={COLORS.grey}
                    style={{
                        backgroundColor: COLORS.ivoryDark,
                        height: 50,
                        marginHorizontal: 30,
                        borderRadius: 16,
                        marginTop: 50,
                        marginBottom: 95,
                        width: width-60, 
                        justifyContent: 'center'
                    }}
                    labelStyle={{
                        marginLeft: 5,
                        color: COLORS.grey,
                        fontFamily: 'RH-Medium'
                    }}
                    onPressButton={() => console.log('navigate screen send Feedback')}
                />

        </ScrollView>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    headerImgContainer: {
        height: 0.35*height,
        width: width,
        backgroundColor: COLORS.mainBackground,
    },

    contentSection: {
        height: height-(0.35*height),
        width: width,
    },

    box: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: COLORS.grey,
        marginLeft: 2,
        color: COLORS.white,
        alignSelf: 'baseline',
        marginTop: 5,
    },

    heartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
})

