import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Button,
} from "react-native";
import { format } from "date-fns";
import { FloatingAction } from "react-native-floating-action";

const SCREEN_WIDTH = Dimensions.get("window").width;
const userIcon = require("../assets/userIcon.png");

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.setTime}>{getTodaysDate()}</Text>
                <Image style={styles.setUserIcon} source={userIcon} />
            </View>
            <View style={styles.calories}>
                <Text style={styles.totalCals}>(Total Calories Area)</Text>
                <View style={styles.calorieBreakdown}>
                    <View style={styles.meals}>
                        <Text style={{ color: "white" }}>Breakfast</Text>
                        <Text style={{ color: "white" }}>Lunch</Text>
                        <Text style={{ color: "white" }}>Dinner</Text>
                    </View>
                    <View style={styles.meals}>
                        <Text style={{ color: "white" }}>Snacks</Text>
                        <Text style={{ color: "white" }}>Exercise</Text>
                    </View>
                </View>
            </View>
            <View style={styles.macronutrients}>
                <Text style={{ color: "white" }}>(Macronutrients Area)</Text>
            </View>
            <View style={styles.successCalender}>
                <Text style={{ color: "white" }}>(Success Calender Area)</Text>
            </View>
            <View>
                <FloatingAction
                    onPressMain={() => navigation.navigate("Log")}
                />
            </View>
            {/*<Button title="Add" onPress={() => navigation.navigate("Log")} />*/}
        </View>
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
        color: "white",
        width: "60%",
    },
    meals: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: "white",
    },
    macronutrients: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",
    },
    successCalender: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",
    },
    setTime: {
        color: "#ffffff",
    },
    setUserIcon: {
        height: 24,
        width: 24,
    },
});

export default Home;
