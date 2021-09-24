import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "./screens";
import { Home } from "./screens";
import { Log } from "./screens";
import { History } from "./screens";
import { Dailygoals } from "./screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native-paper";
import {
  GREYBG,
  GREY,
  RED,
  BLACK,
  GREEN,
  BLUE,
  LTGREY,
} from "./config/constants";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Nested navigators (homeTabView nested below) IOT have a signin screen first without bottom tabs showing
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Signin"}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Dailygoals" component={Dailygoals} />
        <Stack.Screen name="HomeTabs" component={homeTabView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Home view after signin, with bottom tabs showing
function homeTabView() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0, //25
          left: 0, // 20
          right: 0, // 20
          elevation: 0,
          backgroundColor: GREYBG,
          borderRadius: 0, // 12
          height: 70, // 78
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Button
                icon="home"
                labelStyle={{
                  fontSize: 30,
                  color: focused ? RED : GREY,
                }}
              >
                <Text style={{ fontSize: 16 }}>Home</Text>
              </Button>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Log"
        component={Log}
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              icon="plus-box"
              labelStyle={{ fontSize: 65, color: RED }}
            ></Button>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Button
                icon="history"
                labelStyle={{
                  fontSize: 30,
                  color: focused ? RED : GREY,
                }}
              >
                <Text style={{ fontSize: 16 }}>History</Text>
              </Button>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundcolor: RED,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

// TODO: Put into its own file, global app styles should be navigationcontainer prop
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "white",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.5,
    elevation: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
