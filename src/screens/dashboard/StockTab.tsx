import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CenteredLogo from '../../components/global/CenteredLogo'
import CustomText from '../../components/global/CustomText'
import TabHeader from '../../components/dashboard/TabHeader'
import FNOIndexes from '../../components/stocks/FNOIndexes'
import CustomTab from '../../components/dashboard/CustomTab'
import Explore from '../../components/stocks/Explore'
import Holdings from '../../components/stockholdings/Holdings'
import WatchList from '../../components/watchlist/WatchList'
import AddWatchlist from '../../components/watchlist/AddWatchlist'
import StockHeader from '../../components/stocks/StockHeader'

const StockTab = () => {
    const MyTabs = [
        {
          name: "Explore",
          component: <Explore />,
        },
        {
          name: "Holdings",
          component: <Holdings />,
        },
        {
          name: "Himanshu's Watchlist",
          component: <WatchList />,
        },
        {
          name: "+ Watchlist",
          component: <AddWatchlist />,
        },
      ];

  return (
   
        <CustomTab tabs={MyTabs} Header={StockHeader} />
 
  )
}

export default StockTab

const styles = StyleSheet.create({})