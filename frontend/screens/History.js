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

/*
// returns key/value pairs of date/totalCalories+Protein+etc..
async function getHistory(usersID) {
    const response = await axios.get(url + usersID);
    const data = await response.data;
}
*/

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const History = () => {
    const [currentUsersID, setCurrentUsersID] = React.useState("");
    const [historyData, setHistoryData] = React.useState();
    const [refreshing, setRefreshing] = React.useState(false);

    let dayNumber = 0;
    console.log("hello");

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@storage_Key");
            if (value !== null) {
                setCurrentUsersID(value);
                console.log(currentUsersID);
            }
        } catch (error) {
            console.log("Error reading AsyncStorage value -> " + error);
        }
    };
    getData();

    // returns key/value pairs of date/totalCalories+Protein+etc..
    async function getHistory(usersID) {
        try {
            const response = await axios.get(daysLogURL + usersID);
            //const responseData = await response.data[0];
            setHistoryData(response.data[0]);
        } catch (error) {
            console.log("ERROR (getHistory) -> " + error);
        }

        //console.log(historyData);
    }
    //getHistory(currentUsersID);

    /*
    axios
        .get(url + currentUsersID)
        .then((res) => {
            setHistoryData(res.data);
            console.log(res.data);
        })
        .catch((error) => console.log("ERROR (Gethistory) -> " + error));
    */

    /*
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //getHistory(currentUsersID);
        wait(2000).then(() => setRefreshing(false));
    });
    */

    React.useEffect(() => {
        getHistory(currentUsersID);
        console.log(historyData);

        /*
        // Works, but not on the first run of component
        axios({
            method: "get",
            url: daysLogURL + currentUsersID,
        })
            .then((res) => {
                setHistoryData(res.data);
                console.log("DATA: " + res.data[0].totalCalories);
            })
            .catch((error) => console.log(error));
        */
        /*
        axios
            .get(daysLogURL + currentUsersID)
            .then((res) => {
                setHistoryData(res.data);
                console.log("HISTORY: " + historyData);
                console.log("HISTORY RES: " + res.data);
            })
            .catch((error) => console.log("ERROR (Gethistory) -> " + error));
            */
    }, []);

    /*
    useFocusEffect(
        React.useCallback(() => {
            // Fetching data too much
            //getHistory(currentUsersID);
            axios
                .get(url + currentUsersID)
                .then((res) => {
                    setHistoryData(res.data[0]);
                    //console.log(historyData);
                })
                .catch((error) =>
                    console.log("ERROR (Gethistory) -> " + error)
                );
        })
    );
    */

    //console.log(response.data);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                // Iterates via object.keyName
                data={[{ key: "Ten" }]}
                /*
                keyExtracter={(item, index) => {
                    return index.toString();
                }}
                */
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
