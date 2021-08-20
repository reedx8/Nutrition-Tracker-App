import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    SafeAreaView,
    RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axios = require("axios");
const url = "http://localhost:5000/log/";

// returns key/value pairs of date/totalCalories+Protein+etc..
async function getHistory(usersID) {
    const response = await axios.get(url + usersID);
    const data = await response.data;
}

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
const History = () => {
    const [currentUsersID, setCurrentUsersID] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);

    let dayNumber = 0;

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@storage_Key");
            if (value !== null) {
                setCurrentUsersID(value);
                //console.log(value);
            }
        } catch (error) {
            console.log("Error reading AsyncStorage value -> " + error);
        }
    };
    getData();
    //console.log(currentUsersID);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //getHistory(currentUsersID);
        wait(2000).then(() => setRefreshing(false));
    });

    useFocusEffect(
        React.useCallback(() => {
            getHistory(currentUsersID);
        })
    );
    //console.log(response.data);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                // Iterates via object.keyName
                data={[
                    { key: "100 Calories", key2: "5 Protein" },
                    { key: "0 Calories", key2: "10 Protein" },
                ]}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 10,
                        }}
                    >
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.defaultText}>
                                Day {(dayNumber += 1)}:{" "}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.defaultText}>{item.key2}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View
                        style={{
                            alignSelf: "center",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.emptyText}>
                            You havent started logging yet!
                        </Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                        title="Fetching your history..."
                        titleColor="lightgrey"
                    />
                }
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        flexDirection: "column",
    },
    defaultText: {
        color: "white",
        fontSize: 19,
    },
    emptyText: {
        color: "white",
        fontSize: 19,
    },
});

export default History;
