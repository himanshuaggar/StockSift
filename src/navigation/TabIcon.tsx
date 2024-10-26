import Mutual from "../assets/tabicons/mutual.png";
import MutualFocused from "../assets/tabicons/mutual.png";
import Stock from "../assets/tabicons/stock.png";
import StockFocused from "../assets/tabicons/stock.png";
import Pay from "../assets/tabicons/pay.png";
import PayFocused from "../assets/tabicons/pay.png";
import News from "../assets/tabicons/newspaper.png";
import NewsFocused from "../assets/tabicons/newspaper.png"
import { FC } from "react";
import { Image } from "react-native";
import { GlobalStyles } from "../styles/GlobalStyles";

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const TabIcon: FC<TabProps> = ({ name }) => {
  return (
    <Image
      source={name === "Stock" ? Stock : name === "Mutual" ? Mutual : name === "Pay" ? Pay : News}
      style={[GlobalStyles.tabIcon]}
    />
  );
};

const TabIconFocused: FC<TabProps> = ({ name }) => {
  return (
    <Image
      source={
        name === "Stock"
          ? StockFocused
          : name === "Mutual"
            ? MutualFocused
            : name === "Pay"
              ? PayFocused :
              NewsFocused
      }
      style={[GlobalStyles.tabIcon]}
    />
  );
};

export const StockTabIcon: FC<IconProp> = ({ focused }) => {
  return focused ? <TabIconFocused name="Stock" /> : <TabIcon name="Stock" />;
};

export const MutualTabIcon: FC<IconProp> = ({ focused }) => {
  return focused ? <TabIconFocused name="Mutual" /> : <TabIcon name="Mutual" />;
};

export const PayTabIcon: FC<IconProp> = ({ focused }) => {
  return focused ? <TabIconFocused name="Pay" /> : <TabIcon name="Pay" />;
};

export const NewsTabIcon: FC<IconProp> = ({ focused }) => {
  return focused ? <TabIconFocused name="News" /> : <TabIcon name="News" />;
};