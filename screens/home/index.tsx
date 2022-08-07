import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NavigationRoutes, Routes, StackNavigationProps } from "../../types/navigationRoutes";
import { FlatList } from "react-native-gesture-handler";

const screens = [
  {
    name: NavigationRoutes.CreditCard,
    title: "Credit Card",
  },
  {
    name: NavigationRoutes.Drawing,
    title: "Drawing",
  },
  {
    name: NavigationRoutes.Effects,
    title: "Effects",
  },
  {
    name: NavigationRoutes.Hue,
    title: "Hue",
  },
];

type HomeProps = StackNavigationProps<Routes, NavigationRoutes.Home>

const Home: React.FC<HomeProps> = ({navigation}) => {
  const renderItems: ListRenderItem<typeof screens[number]> = ({
     item
  }) => {
    const onPressItem = () => {
        navigation.navigate(item.name);
    }
    return (
      <TouchableOpacity onPress={onPressItem} style={styles.itemButton}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item: typeof screens[number]) => {
    return item.name;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={screens}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  itemButton: {
    padding: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
  itemText: {
    color: "#fff",
  },
});
