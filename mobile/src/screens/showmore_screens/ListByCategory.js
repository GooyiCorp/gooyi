import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from '../../constants/size'
import { COLORS } from '../../index/constantsindex'
import SettingHeader from '../../components/components_navigation/SettingHeader'
import Filter from '../../components/components_search_screen/Filter'
import CategoryIconButton from '../../components/components_discover_screen/CategoryButtonSelector/CategoryIconButton'
import { icons } from '../../components/components_universal/Icons'
import CategoryButtonSelector from '../../components/components_discover_screen/CategoryButtonSelector/CategoryButtonSelector'
import Request from './../../helper/request';
import StoreCard from '../../components/components_stores_screen/StoreCard'
import { useSelector } from 'react-redux'

export default function ListByCategory({
  route,
  navigation,
  navigation: {goBack}
}) {
  const { name } = route.params
  const longitude = useSelector((state) => state.locate.long)
  const latitude = useSelector((state) => state.locate.lat)
  // Store fetching
  const [stores, setStores] = useState([])
  const getStores = async () => {
    const response = await Request(`user/categories/store?name=${name}&longitude=${longitude}&latitude=${latitude}&radius=${10000}`, "GET", null)
    setStores(response.data);
  }
  useEffect(() => {
    getStores();
  }, [])

  return (
    <View style={styles.card}>
      <SettingHeader
        goBack
        onPressGoBack={() => goBack()}
        header
        headerText={'Pizza'}
        iconStyle={COLORS.mainBackground}
        selectorButton
      />
      <FlatList 
        data={stores}
        renderItem={({ item }) => <StoreCard onPress={() => navigation.navigate('Store', { screen: 'StoreEntry', params: { store_id: item.store_id } })} shopName={item.name} description={item.description} distance={item.distance}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height,
    width: width,
    backgroundColor: COLORS.mainBackground,
  }
})