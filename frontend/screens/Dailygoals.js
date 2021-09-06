import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styleSheets } from "min-document";

const usersURL = "http://localhost:5000/users/addGoals/";

const Dailygoals = ({ navigation }) => {
    const [dailyCalories, setCalories] = React.useState("");
    const [dailyProtein, setProtein] = React.useState("");
    const [dailyFats, setFats] = React.useState("");
    const [dailyCarbs, setCarbs] = React.useState("");
    const [userID, setUserID] = React.useState("");

    // Gets user's id to send to backend during obSubmitPress()
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@storage_Key");
            if (value != null) {
                setUserID(value);
            }
        } catch (error) {
            console.log("Error reading AsyncStorage value: " + error);
        }
    };
    getData();

    /*
    React.useEffect(() => {
        getData();
    }, [userID]);
    */

    // Post user's entered in nutrition goals
    function onSubmitPress() {
        axios({
            method: "post",
            url: usersURL,
            data: {
                calorieGoal: dailyCalories,
                proteinGoal: dailyProtein,
                fatGoal: dailyFats,
                carbsGoal: dailyCarbs,
                user: userID,
            },
        })
            .then((res) => console.log(res.data))
            .catch((error) => console.log("screens/dailygoals.js: " + error));
        navigation.navigate("HomeTabs");
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text
                style={{
                    color: "white",
                    fontSize: 40,
                    textAlign: "center",
                }}
            >
                Welcome!
            </Text>
            <Text style={styles.headlineText}>
                Enter in your daily nutrition goals below. You can change them
                at any time.
            </Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={10}
            >
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Daily calories</Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="required"
                        keyboardAppearance="dark"
                        maxLength={5}
                        textAlign="right"
                        value={dailyCalories}
                        onChangeText={setCalories}
                        defaultValue="0"
                    />
                </View>
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Daily protein</Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="optional"
                        keyboardAppearance="dark"
                        maxLength={3}
                        textAlign="right"
                        value={dailyProtein}
                        onChangeText={setProtein}
                        defaultValue="0"
                    />
                </View>
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Daily fat</Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="optional"
                        keyboardAppearance="dark"
                        maxLength={3}
                        textAlign="right"
                        value={dailyFats}
                        onChangeText={setFats}
                        defaultValue="0"
                    />
                </View>
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Daily carbs</Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="optional"
                        keyboardAppearance="dark"
                        maxLength={5}
                        textAlign="right"
                        value={dailyCarbs}
                        onChangeText={setCarbs}
                        defaultValue="0"
                    />
                </View>
            </KeyboardAvoidingView>
            <AwesomeButton
                backgroundColor="deepskyblue"
                backgroundDarker="#1F1F1F"
                stretch={true}
                textSize={20}
                textColor="white"
                onPress={() => onSubmitPress()}
            >
                Submit
            </AwesomeButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000",
        justifyContent: "space-evenly",
    },
    headlineRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    headlineText: {
        color: "grey",
        fontSize: 18,
        textAlign: "center",
    },
    entriesRow: {
        flexDirection: "row",
        backgroundColor: "#1F1F1F",
        justifyContent: "space-between",
        //height: "10%",
        borderRadius: 10,
        margin: 5,
    },
    inputBox: {
        margin: 4,
        //flex: 1,  // This flex will override justifyContent in entriesRow below
        borderBottomColor: "deepskyblue",
        borderBottomWidth: 1,
        width: "30%",
        color: "white",
        textAlign: "right",
    },
    defaultText: {
        color: "white",
        fontSize: 19,
        padding: 10,
    },
});

export default Dailygoals;
