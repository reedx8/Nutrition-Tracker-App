import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    SafeAreaView,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseISO } from "date-fns";

const daysLogURL = "http://localhost:5000/daysLog/getLog/";

const History = () => {
    const [currentUsersID, setCurrentUsersID] = React.useState(null);
    const [historyData, setHistoryData] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

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

    async function getHistory() {
        try {
            const response = await axios.get(daysLogURL + currentUsersID);
            const data = await response.data;
            setHistoryData(data.reverse());
        } catch (error) {
            console.log("ERROR (getHistory) -> " + error);
        }
    }
    /*
    function getHistory() {
        axios.get(daysLogURL + currentUsersID).then((response) => {
            setHistoryData(response.data);
        });
    }
    */
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

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (currentUsersID !== null) {
            getHistory();
        }
        wait(2000).then(() => setRefreshing(false));
    }, [currentUsersID]);

    if (historyData == null) {
        //return <Text style={{ fontSize: 80 }}>Loading...</Text>;
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="lightgrey" />
                {/*<Text style={{ color: "lightgrey" }}>Loading...</Text>*/}
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                // Iterates via object.keyName
                data={historyData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: "column",
                            margin: 3,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#1F1F1F",
                                borderRadius: 10,
                                padding: 5,
                            }}
                        >
                            <Text style={styles.daysTitle}>
                                {format(parseISO(item.createdAt), "eeee")}
                            </Text>
                            <Text style={styles.defaultSubText}>
                                {format(parseISO(item.createdAt), "PP")}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 2,
                            }}
                        >
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.number}>
                                    {item.totalCalories}
                                </Text>
                                <Text style={styles.defaultText}>Cals</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.number}>
                                    {item.totalProtein}
                                </Text>
                                <Text style={styles.defaultText}>Protein</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.number}>
                                    {item.totalFats}
                                </Text>
                                <Text style={styles.defaultText}>Fats</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.number}>
                                    {item.totalCarbs}
                                </Text>
                                <Text style={styles.defaultText}>Carbs</Text>
                            </View>
                        </View>
                    </View>
                    /*
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 10,
                        }}
                    >
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.defaultText}>
                                {format(parseISO(item.createdAt), "eeee")}
                            </Text>
                            <Text style={styles.defaultSubText}>
                                {format(parseISO(item.createdAt), "PP")}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.defaultText}>
                                {item.totalCalories}
                            </Text>
                        </View>
                    </View>
                    */
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
    loadingContainer: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
    },
    horizontal: {},
    daysTitle: {
        color: "deepskyblue",
        fontSize: 24,
    },
    defaultText: {
        color: "grey",
        fontSize: 19,
    },
    defaultSubText: {
        color: "white",
        fontSize: 15,
        //textAlignVertical: "bottom",
    },
    number: {
        color: "grey",
        fontSize: 19,
        textAlign: "center",
    },
    emptyText: {
        color: "white",
        fontSize: 19,
    },
});

export default History;
