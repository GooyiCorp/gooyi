import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, width } from '../../../helper/constants/size'
import { COLORS } from '../../../helper/constants/colors'
import ManagementHeader from '../../../components/components_Manage/ManagementHeader'
import { H1, H5, T1, T3, T4, T5 } from '../../../helper/constants/text'
import SectionTitle from '../../../components/universal/Header/SectionTitle'
import SectionCard from '../../../components/components_Home/SectionCard'
import DraftCard from '../../../components/components_Manage/DraftCard'
import ServicesButton from '../../../components/universal/Buttons/ServicesButton'
import { icons } from '../../../components/universal/Icons/Icons'

export default function ManagementScreen() {

  const ManageButtonsList = [
    {id: 1, type: 'coupon', route: 'ManageCoupons'},
    {id: 2, type: 'reward', route: 'ManageReward'},
    {id: 3, type: 'deal', route: 'ManageDeals'},
    {id: 4, type: 'quest', route: 'ManageQuest'},
  ]
  return (
    <View style={styles.screen}>
      <ManagementHeader />

      <ScrollView 
        style={{
          marginTop: 110, 
          // backgroundColor: 'yellow', 
          width: width,
          paddingHorizontal: 20,
          marginBottom: 80
        }}
      >
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={H5}>Status</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          marginTop: 20
        }}>
          <View style={{alignItems: 'center'}}>
            <Text style={H1}>3</Text>
            <Text style={T3}>Eingereicht</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={H1}>2</Text>
            <Text style={T3}>Genehmigt</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={H1}>1</Text>
            <Text style={T3}>Abgelehnt</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 20}}>
          <View style={{width: width/2-25, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, backgroundColor: COLORS.grey, borderRadius: 5, borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 10}}>
            <Text style={[T1, {color: COLORS.white}]}>Coupons</Text>
          </View>
          <View style={{width: width/2-25, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, backgroundColor: COLORS.white, borderRadius: 5, borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 10}}>
            <Text style={[T1, {color: COLORS.grey}]}>Prämien</Text>
          </View>
          <View style={{width: width/2-25, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, backgroundColor: COLORS.white, borderRadius: 5, borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 10}}>
            <Text style={[T1, {color: COLORS.grey}]}>Deals</Text>
          </View>
          <View style={{width: width/2-25, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, backgroundColor: COLORS.white, borderRadius: 5, borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 10}}>
            <Text style={[T1, {color: COLORS.grey}]}>Quests</Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <SectionTitle 
            title={'Verwalten'}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <SectionCard type={'coupon'}/>
            <SectionCard type={'reward'}/>
            <SectionCard type={'deal'}/>
            <SectionCard type={'quest'}/>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <SectionTitle 
            title={'Letzten Entwürfe'}
            showMoreButton
          />
          <DraftCard />
        </View>

        <View style={{marginTop: 20, marginBottom: 50}}>
          <SectionTitle 
            title={'Weitere Dienste'}
          />
          <ServicesButton 
            title={'Analytics'}
            icon={icons.MaterialCommunityIcons}
            iconName={'chart-bell-curve-cumulative'}
            iconSize={17}
          />
          <ServicesButton 
            title={'Berichte'}
            icon={icons.Ionicons}
            iconName={'document-text-outline'}
            iconSize={21}
          />
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        height: height,
        width: width,
        backgroundColor: COLORS.white,

        // justifyContent: 'center',
        alignItems: 'center',

        
    },
})