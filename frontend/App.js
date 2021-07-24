import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./screens";
import { Log } from "./screens";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
        /*
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! HI</Text>
      <StatusBar style="auto" />
    </View>
    */
    );
}

// TODO: Put into its own file, global app styles should be navigationcontainer prop
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
