import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
    SafeAreaView,
} from "react-native";
import { format } from "date-fns";
import { FloatingAction } from "react-native-floating-action";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useIsFocused } from "@react-navigation/native";
import { Appbar, Button, Title, BottomNavigation } from "react-native-paper";

const SCREEN_WIDTH = Dimensions.get("window").width;
const userIcon = require("../assets/userIcon.png");
const axios = require("axios");
const url = "http://localhost:5000/log";

const Home = ({ navigation }) => {
    // To get total calories from the log database, by using React hooks.
    const [totalCalories, setTotalCalories] = React.useState("");
    const [totalProtein, setTotalProtein] = React.useState("");
    // Using useFocusEffect bellow doesnt consist. refresh each time
    /*
    function getCaloriesData() {
        useFocusEffect(
            React.useCallback(() => {
                //alert("screen was focused");
                let total = 0;
                axios.get(url).then((response) =>
                    setTotalCalories(() => {
                        for (const i in response.data) {
                            total += response.data[i].calories;
                        }
                        return total;
                    })
                );
            }, [total])
        );
    }
    getCaloriesData();
    */

    // Using useIsFocused() instead of useFocusEffect() works better
    const isFocused = useIsFocused();
    let totalCals = 0;
    let totalProt = 0;
    if (isFocused) {
        axios.get(url).then((response) =>
            setTotalCalories(() => {
                for (const i in response.data) {
                    totalCals += response.data[i].calories;
                }
                return totalCals;
            })
        );
        axios.get(url).then((response) =>
            setTotalProtein(() => {
                for (const i in response.data) {
                    totalProt += response.data[i].protein;
                }
                return totalProt;
            })
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*
            <Appbar.Header>
                <Appbar.Action
                    icon="dots-vertical"
                    style={{ marginLeft: "auto" }}
                />
            </Appbar.Header>
            */}
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.setTime}>{getTodaysDate()}</Text>
                <Button
                    icon="account-circle"
                    mode="text"
                    labelStyle={{ color: "grey" }}
                >
                    Profile
                </Button>
                {/*<Image style={styles.setUserIcon} source={userIcon} />*/}
            </View>
            <View style={styles.calories}>
                {/*<Text style={styles.totalCals}>(Total Calories Area)</Text>*/}
                <AnimatedCircularProgress
                    size={160}
                    width={15}
                    fill={80}
                    backgroundWidth={22}
                    tintColor="deepskyblue"
                    rotation={360}
                    lineCap="round"
                    backgroundColor="#1F1F1F"
                    //prefill={10}
                >
                    {() => (
                        <Text style={{ color: "white", fontSize: 30 }}>
                            {totalCalories}
                        </Text>
                    )}
                </AnimatedCircularProgress>
                <View style={styles.calorieBreakdown}>
                    <View style={styles.meals}>
                        <Text style={styles.nutrientTitle}>Breakfast</Text>
                        <Text style={styles.nutrientTitle}>Lunch</Text>
                        <Text style={styles.nutrientTitle}>Dinner</Text>
                    </View>
                    <View style={styles.meals}>
                        <Text style={styles.nutrientNumber}>20</Text>
                        <Text style={styles.nutrientNumber}>30</Text>
                        <Text style={styles.nutrientNumber}>40</Text>
                    </View>
                    <View style={styles.meals}>
                        <Text style={styles.nutrientTitle}>Snacks</Text>
                        <Text style={styles.nutrientTitle}>Exercise</Text>
                    </View>
                    <View style={styles.meals}>
                        <Text style={styles.nutrientNumber}>500</Text>
                        <Text style={styles.nutrientNumber}>60</Text>
                    </View>
                </View>
            </View>
            <View style={styles.macronutrients}>
                <Title style={{ color: "white" }}>Macronutrients</Title>
                <View style={styles.macrosCol}>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientTitle}>Protein</Text>
                    </View>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientNumber}>
                            {totalProtein}g
                        </Text>
                    </View>
                </View>
                <View style={styles.macrosCol}>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientTitle}>Fats</Text>
                    </View>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientNumber}>0g</Text>
                    </View>
                </View>
                <View style={styles.macrosCol}>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientTitle}>Carbs</Text>
                    </View>
                    <View style={styles.macrosInnerRow}>
                        <Text style={styles.nutrientNumber}>0g</Text>
                    </View>
                </View>
            </View>
            <View style={styles.successCalender}>
                <Text style={{ color: "white" }}>(Success Calender Area)</Text>
            </View>
            {/*}
            <View>
                <FloatingAction
                    onPressMain={() => navigation.navigate("Log")}
                    color="deepskyblue"
                    //animated={false}
                    buttonSize={65}
                    iconHeight={20}
                    iconWidth={20}
                />
            </View>
            */}
            {/*<Button title="Add" onPress={() => navigation.navigate("Log")} />*/}
        </SafeAreaView>
    );
};

function getTodaysDate() {
    let todaysDate = format(new Date(), "EEEE, do MMMM");
    return todaysDate;
}

// TODO: Put into its own file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    calories: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    totalCals: {
        flexDirection: "column",
        color: "white",
    },
    calorieBreakdown: {
        flexDirection: "column",
        //color: "white",
        width: "60%",
        margin: 5,
        backgroundColor: "#1F1F1F",
        justifyContent: "space-around",
        borderRadius: 10,
        padding: 8,
    },
    meals: {
        flexDirection: "row",
        justifyContent: "space-between",
        //color: "white",
    },
    macronutrients: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",
        backgroundColor: "#1F1F1F",
        borderRadius: 10,
        width: "100%",
        margin: 5,
        justifyContent: "space-between",
        padding: 20,
    },
    macrosCol: {
        flexDirection: "column",
    },
    macrosInnerRow: {
        flexDirection: "row",
        color: "red",
    },
    successCalender: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",
        backgroundColor: "#1F1F1F",
        borderRadius: 10,
        width: "100%",
        margin: 5,
    },
    setTime: {
        color: "white",
        fontSize: 25,
    },
    setUserIcon: {
        height: 34,
        width: 34,
    },
    nutrientTitle: {
        color: "lightgrey",
        fontSize: 17,
        //fontWeight: "bold",
    },
    nutrientNumber: {
        color: "lightgreen",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default Home;
