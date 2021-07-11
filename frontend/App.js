import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    ScrollView, 
} from 'react-native';
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Home } from "./screens"
import { Log } from "./screens"

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown:false }}
            initialRouteName={"Home"}
          >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Log" component={Log} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
