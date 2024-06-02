import React, { FC, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/Colors";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";
import DottedLine from "../../assets/images/dotted.png";
import StockCard from "./StockCard";
import { mostBoughtData } from "../../utils/staticData";
import ProductAndTools from "./ProductAndTools";
import GainerAndLoser from "./GainerAndLoser";
import InfoText from "../global/InfoText";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { selectStocks } from "../../redux/reducers/stockSlice";
import { getAllStocks } from "../../redux/actions/stockAction";

interface SepratorProps {
  label: string;
  seeMore?: boolean;
}
const Seprator: FC<SepratorProps> = ({ label, seeMore }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.sectionContainer}>
      <CustomText fontFamily={FONTS.Medium} fontSize={RFValue(10)}>
        {label}
      </CustomText>
      {seeMore && (
        <TouchableOpacity style={styles.seeMore}>
          <CustomText fontFamily={FONTS.Medium} variant="h8">
            See more
          </CustomText>
          <Image
            source={DottedLine}
            style={{
              height: 2,
              marginTop: 2,
              width: "100%",
              tintColor: colors.text,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Explore = () => {
  const dispatch = useAppDispatch();
  const stockData = useAppSelector(selectStocks);
  const [refereshing, setRefreshing] = useState(false);
  
  const refreshHandler = async () => {
    setRefreshing(false);
  };
  const fetchStocks = async () => {
    await dispatch(getAllStocks());
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  console.log(mostBoughtData);
  return (
    <Tabs.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
      refreshControl={
        <RefreshControl
          onRefresh={refreshHandler}
          refreshing={refereshing}
          colors={[Colors.profit]}
          tintColor={Colors.profit}
        />
      }
    >
      <Seprator label="Most bought on StockSift" />
      <StockCard data={stockData} />
      <Seprator label="Product & Tools" />
      <ProductAndTools />
      <GainerAndLoser />
      <Seprator label="Top Intraday" seeMore />
      <StockCard data={stockData} />

      <Seprator label="Stock in news" seeMore />
      <StockCard data={stockData} />
      <InfoText
        data={[
          "This app is made for demo purpose only!",
          "Made by Himanshu Aggarwal",
          "COntact at himanshuaggar00@gmail.com",
          "DP - IN-DP-417-2019",
        ]}
      />
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 15,
    marginTop: 16,
    paddingRight: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeMore: {
    overflow: "hidden",
    top: 2,
  },
});

export default Explore;