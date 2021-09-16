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
    ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { FloatingAction } from "react-native-floating-action";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Appbar, Button, Title, BottomNavigation } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"
import { is } from "date-fns/locale";

const SCREEN_WIDTH = Dimensions.get("window").width;
const userIcon = require("../assets/userIcon.png");
const axios = require("axios");
const url = "http://localhost:5000/log/";
const userURL = "http://localhost:5000/users/getUsersAccountData/";
const caloriesRDA = 2500;

const Home = ({ navigation }) => {
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
    const [calorieGoal, setCalorieGoal] = React.useState(0);
    const [animatedCircleValue, setCircleValue] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true); // helps on first render after signin

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
            getNutritionGoals();
            getAnimatedCircleFillValue();
        })
    );

    async function getNutritionGoals() {
        try {
            const response = await axios.get(userURL + currentUsersID);
            //console.log(response.data);
            setCalorieGoal(() => {
                if (response.data.goals.calories == null) {
                    return 0;
                }
                return response.data.goals.calories;
            });
        } catch (error) {
            console.log("screens/Home.js: " + error);
        }
        console.log(calorieGoal);
    }

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

        setLoading(false);
    }

    function getAnimatedCircleFillValue() {
        setCircleValue(() => {
            return totalCalories >= calorieGoal ? 100 : (totalCalories / calorieGoal) * 100;
        })
    }

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUsersNutritionData();
        getNutritionGoals();
        getAnimatedCircleFillValue();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    if (isLoading == true){
        return(
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="lightgrey"/>
            </SafeAreaView>
        )
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
                <View style={{ flexDirection: "column", width: wp(62),/*width: "65%"*/ }}>
                    <Text style={{ color: "white", fontSize: hp(3.4),/*fontSize: 25*/ }}>Today</Text>
                    <Text style={styles.setTimeText}>{getTodaysDate()}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        width: wp(33),
                        //width: "35%",
                        //direction: "ltr",
                        //justifyContent: "center",
                        //alignSelf: "flex-end",
                    }}
                >
                    <Button
                        icon="account-circle"
                        mode="text"
                        labelStyle={{
                            color: "lightgrey",
                            fontSize: 17, // adjusts text and icon size
                        }}
                        contentStyle={{}}
                    >
                        Profile
                    </Button>
                </View>
            </View>
            {/*
            <View style={styles.header}>
                <Text style={styles.setTime}>{getTodaysDate()}</Text>
                <Button
                    icon="account-circle"
                    mode="text"
                    labelStyle={{ color: "grey" }}
                >
                    Profile
                </Button>
                {//<Image style={styles.setUserIcon} source={userIcon} />}
            </View>
            */}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                        title="Fetching new nutrition data..."
                        titleColor="lightgrey"
                    />
                }
            >
                <View style={styles.circularCaloriesSection}>
                    <AnimatedCircularProgress
                        size={200}
                        width={15}
                        fill={animatedCircleValue == null ? 0: animatedCircleValue}
                        backgroundWidth={22}
                        tintColor={
                            totalCalories > calorieGoal
                                ? "#df5234"
                                : "deepskyblue"
                        }
                        tintColorSecondary={"deepskyblue"} // prevents red tintColor while calculating
                        rotation={360}
                        lineCap="round"
                        backgroundColor="#1F1F1F"
                        //prefill={10}
                    >
                        {() => (
                            <Text
                                style={{
                                    color: "white",
                                    //fontSize: 20,
                                    fontSize: hp(2.4),
                                }}
                            >
                                {getRemainingCalories(
                                    totalCalories,
                                    calorieGoal
                                )}
                            </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Text style={styles.totalCalsText}>
                        GOAL: {calorieGoal} calories/day
                    </Text>
                </View>
                <View style={styles.calorieBreakdownSection}>
                    <View style={styles.mealsCol}>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientTitle}>Breakfast</Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientNumber}>
                                {breakfastCalories}
                            </Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientTitle}>Snacks</Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientNumber}>
                                {snacksCalories}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mealsCol}>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientTitle}>Lunch</Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientNumber}>
                                {lunchCalories}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mealsCol}>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientTitle}>Dinner</Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientNumber}>
                                {dinnerCalories}
                            </Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientTitle}>Exercise</Text>
                        </View>
                        <View style={styles.mealsRow}>
                            <Text style={styles.nutrientNumber}>0</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.macronutrientsSection}>
                    <Title style={{ color: "white", fontSize: hp(2), }}>Macronutrients</Title>
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
                    style={{ margin: 10 }}
                >
                    (Sign in screen)
                </Button>
                <Button
                    onPress={() => navigation.navigate("Dailygoals")}
                    color="white"
                    mode="contained"
                    dark={false}
                    style={{ margin: 10 }}
                >
                    (Daily goals screen)
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

function getRemainingCalories(totalCalories, calorieGoal) {
    //let caloriesRDA = 2500;
    if (totalCalories == calorieGoal) {
        return "0 cals left";
    } else if (totalCalories > calorieGoal) {
        const diff = totalCalories - calorieGoal;
        return diff + " cals over";
    } else {
        const diff = calorieGoal - totalCalories;
        const answer = diff + " cals left";
        return answer;
    }
}

function getTodaysDate() {
    let todaysDate = format(new Date(), "EEEE, do MMMM");
    return todaysDate;
}

/*
function getAnimatedCircleFillValue(tc, cg) {
    return tc >= cg ? 100 : (tc / cg) * 100;
}
*/

// TODO: Put into its own file
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000",
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        //justifyContent: "space-between",
        //padding: 15,
        margin: 10, 
        width: "100%",
    },
    circularCaloriesSection: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 15,
        //flex: 2,
    },
    totalCalsText: {
        color: "lightgrey",
        fontSize: hp(1.8),
    },
    calorieBreakdownSection: {
        flexDirection: "row",
        //color: "white",
        //width: "100%",
        //height: "30%",
        margin: 10,
        backgroundColor: "#1F1F1F",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 15, // CHANGE?
    },
    mealsRow: {
        flexDirection: "row",
        marginBottom: 7,
        //justifyContent: "space-between",
    },
    mealsCol: {
        flexDirection: "column",
        //justifyContent: "space-between",
    },
    macronutrientsSection: {
        flexDirection: "row",
        //flex: 2,
        //alignSelf: "center",
        backgroundColor: "#1F1F1F",
        borderRadius: 10,
        //width: "100%",
        margin: 10,
        justifyContent: "space-between",
        padding: 15,
    },
    macrosCol: {
        flexDirection: "column",
    },
    macrosInnerRow: {
        flexDirection: "row",
    },
    setTimeText: {
        color: "grey",
        fontSize: hp(2),
        //fontSize: 20,
    },
    setUserIcon: {
        height: 34,
        width: 34,
    },
    nutrientTitle: {
        color: "lightgrey",
        fontSize: hp(2.1),
        //fontSize: 17,
    },
    nutrientNumber: {
        color: "lightgreen",
        fontSize: hp(2.5),
        //fontSize: 20,
        fontWeight: "300",
    },
});

export default Home;
