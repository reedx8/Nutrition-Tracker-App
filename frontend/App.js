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
import { Home } from "./screens";
import { Log } from "./screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from "react-native-paper";

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
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
                backgroundcolor: "red",
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: "absolute",
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: "#1F1F1F",
                        borderRadius: 12,
                        height: 78,
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
                                        color: focused ? "black" : "grey",
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
                                labelStyle={{ fontSize: 70, color: "#df5234" }}
                            ></Button>
                        ),
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
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
                                    icon="menu-open"
                                    labelStyle={{
                                        fontSize: 30,
                                        color: focused ? "black" : "grey",
                                    }}
                                >
                                    <Text style={{ fontSize: 16 }}>
                                        Settings
                                    </Text>
                                </Button>
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
            {/*
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={"Home"}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Home",
                        headerStyle: {
                            backgroundColor: "#1F1F1F",
                        },
                        headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="Log"
                    component={Log}
                    options={{
                        headerStyle: { backgroundColor: "#1F1F1F" },
                        headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
                */}
        </NavigationContainer>
    );
}

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
