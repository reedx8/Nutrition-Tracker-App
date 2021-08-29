import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView,
    RefreshControl,
} from "react-native";
import { format } from "date-fns";
import { FloatingAction } from "react-native-floating-action";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Appbar, Button, Title, BottomNavigation } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const userIcon = require("../assets/userIcon.png");
const axios = require("axios");
const url = "http://localhost:5000/log/";
const caloriesRDA = 2500;

const Home = ({ navigation }) => {
    // To get total calories from the log database, by using React hooks.
    const [totalCalories, setTotalCalories] = React.useState(0);
    const [totalProtein, setTotalProtein] = React.useState(0);
    const [totalFats, setTotalFats] = React.useState(0);
    const [totalCarbs, setTotalCarbs] = React.useState(0);
    const [breakfastCalories, setBreakfast] = React.useState(0);
    const [lunchCalories, setLunch] = React.useState(0);
    const [dinnerCalories, setDinner] = React.useState(0);
    const [snacksCalories, setSnacks] = React.useState(0);
    const [currentUsersID, setCurrentUsersID] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);

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

    let total = 0;
    let totalCals = 0;
    // useFocusEffect w/ useCallback works better than useIsFocused()
    useFocusEffect(
        React.useCallback(() => {
            getUsersNutritionData();
        })
    );

    async function getUsersNutritionData() {
        const response = await axios.get(url + currentUsersID);
        //console.log(response);

        setTotalProtein(() => {
            for (const i in response.data) {
                total += response.data[i].protein;
            }
            return total;
        });
        total = 0;
        setTotalFats(() => {
            for (const i in response.data) {
                total += response.data[i].fats;
            }
            return total;
        });
        total = 0;
        setTotalCarbs(() => {
            for (const i in response.data) {
                total += response.data[i].carbs;
            }
            return total;
        });
        total = 0;
        setBreakfast(() => {
            for (const i in response.data) {
                if (response.data[i].mealType == "breakfast") {
                    total += response.data[i].calories;
                }
            }
            return total;
        });
        totalCals += total;
        total = 0;
        setLunch(() => {
            for (const i in response.data) {
                if (response.data[i].mealType == "lunch") {
                    total += response.data[i].calories;
                }
            }
            return total;
        });
        totalCals += total;
        total = 0;
        setDinner(() => {
            for (const i in response.data) {
                if (response.data[i].mealType == "dinner") {
                    total += response.data[i].calories;
                }
            }
            return total;
        });
        totalCals += total;
        total = 0;
        setSnacks(() => {
            for (const i in response.data) {
                if (response.data[i].mealType == "snacks") {
                    total += response.data[i].calories;
                }
            }
            return total;
        });
        totalCals += total;
        setTotalCalories(() => {
            return totalCals;
        });
    }
    /*
    function getUsersNutritionData() {
        axios.get(url + currentUsersID).then((response) => {
            //console.log(response);
            setTotalProtein(() => {
                for (const i in response.data) {
                    total += response.data[i].protein;
                }
                return total;
            });
            total = 0;
            setBreakfast(() => {
                for (const i in response.data) {
                    if (response.data[i].mealType == "breakfast") {
                        total += response.data[i].calories;
                    }
                }
                return total;
            });
            totalCals += total;
            total = 0;
            setLunch(() => {
                for (const i in response.data) {
                    if (response.data[i].mealType == "lunch") {
                        total += response.data[i].calories;
                    }
                }
                return total;
            });
            totalCals += total;
            total = 0;
            setDinner(() => {
                for (const i in response.data) {
                    if (response.data[i].mealType == "dinner") {
                        total += response.data[i].calories;
                    }
                }
                return total;
            });
            totalCals += total;
            total = 0;
            setSnacks(() => {
                for (const i in response.data) {
                    if (response.data[i].mealType == "snacks") {
                        total += response.data[i].calories;
                    }
                }
                return total;
            });
            totalCals += total;
            setTotalCalories(() => {
                return totalCals;
            });
        });
    }
    */

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUsersNutritionData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                        title="Fetching your nutrition data..."
                        titleColor="lightgrey"
                    />
                }
            >
                <View style={styles.calories}>
                    {/*<Text style={styles.totalCals}>(Total Calories Area)</Text>*/}
                    <AnimatedCircularProgress
                        size={160}
                        width={15}
                        fill={(totalCalories / caloriesRDA) * 100}
                        backgroundWidth={22}
                        tintColor="deepskyblue"
                        rotation={360}
                        lineCap="round"
                        backgroundColor="#1F1F1F"
                        //prefill={10}
                    >
                        {() => (
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                }}
                            >
                                {getRemainingCalories(totalCalories)} cals left
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
                            <Text style={styles.nutrientNumber}>
                                {breakfastCalories}
                            </Text>
                            <Text style={styles.nutrientNumber}>
                                {lunchCalories}
                            </Text>
                            <Text style={styles.nutrientNumber}>
                                {dinnerCalories}
                            </Text>
                        </View>
                        <View style={styles.meals}>
                            <Text style={styles.nutrientTitle}>Snacks</Text>
                            <Text style={styles.nutrientTitle}>Exercise</Text>
                        </View>
                        <View style={styles.meals}>
                            <Text style={styles.nutrientNumber}>
                                {snacksCalories}
                            </Text>
                            <Text style={styles.nutrientNumber}>0</Text>
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
                            <Text style={styles.nutrientNumber}>
                                {totalFats}g
                            </Text>
                        </View>
                    </View>
                    <View style={styles.macrosCol}>
                        <View style={styles.macrosInnerRow}>
                            <Text style={styles.nutrientTitle}>Carbs</Text>
                        </View>
                        <View style={styles.macrosInnerRow}>
                            <Text style={styles.nutrientNumber}>
                                {totalCarbs}g
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.successCalender}>
                    <Text style={{ color: "white" }}>
                        (Success Calender Area)
                    </Text>
                </View>
                {/*
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
                <Button
                    onPress={() => navigation.navigate("Signin")}
                    color="white"
                    mode="contained"
                    dark={false}
                >
                    (Sign in screen)
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

function getRemainingCalories(calories) {
    //let caloriesRDA = 2500;

    if (calories >= caloriesRDA) {
        return 0;
    } else {
        return caloriesRDA - calories;
    }
}
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
        //fontWeight: "400",
    },
    nutrientNumber: {
        color: "lightgreen",
        fontSize: 20,
        fontWeight: "300",
    },
});

export default Home;
