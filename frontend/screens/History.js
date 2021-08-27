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
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";

const daysLogURL = "http://localhost:5000/daysLog/getLog/";

function test(history) {
    console.log("Total Calories: " + history);
}
const History = () => {
    const [currentUsersID, setCurrentUsersID] = React.useState(null);
    const [historyData, setHistoryData] = React.useState(null);
    //const [refreshing, setRefreshing] = React.useState(false);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@storage_Key");
            if (value !== null) {
                setCurrentUsersID(value);
            }
        } catch (error) {
            console.log("Error reading AsyncStorage value -> " + error);
        }
    };

    /*
    async function getHistory() {
        try {
            const response = await axios.get(daysLogURL + currentUsersID);
            // works perfectyly
            //setHistoryData(response.data[1].totalCalories);
            //console.log(response.data[0].totalCalories);
            setHistoryData(() => {
                return response.data;
            });
        } catch (error) {
            console.log("ERROR (getHistory) -> " + error);
        }
    }
    */
    function getHistory() {
        axios.get(daysLogURL + currentUsersID).then((response) => {
            setHistoryData(response.data);
        });
    }
    // useEffect stops the neverending fetching that happens with useFocusEffect
    /*
    useFocusEffect(
        React.useCallback(() => {
            getHistory();
        })
    );
    */
    React.useEffect(() => {
        getData();
        if (currentUsersID !== null) {
            getHistory();
        }
    }, [currentUsersID]);

    /*
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //getHistory(currentUsersID);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    */

    let dayNumber = 0;
    if (historyData == null) {
        return <Text style={{ fontSize: 80 }}>Loading...</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={{ color: "white" }}>
                History: {historyData[1].totalCalories}
            </Text>
            {/*
            <FlatList
                // Iterates via object.keyName
                data={[{ key: "Ten" }]}
                keyExtracter={(item, index) => {
                    return index.toString();
                }}
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
                            <Text style={styles.defaultText}>{item.key}</Text>
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
                        //onRefresh={onRefresh}
                        tintColor="lightgrey"
                        title="Fetching your history..."
                        titleColor="lightgrey"
                    />
                }
            />*/}
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
