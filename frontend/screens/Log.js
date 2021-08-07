import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from "react-native";
import axios from "axios";
import AwesomeButton from "react-native-really-awesome-button";
import { RadioButton, Caption, Appbar } from "react-native-paper";

const Log = ({ navigation }) => {
    /*
    const [logData, setLogData] = React.useState({
        foodName: "",
        calories: 0,
        protein: 0,
    });
    */

    // Declares our state variables using react's Hooks feature
    const [foodName, setName] = React.useState("");
    const [calories, setCalories] = React.useState("");
    const [protein, setProtein] = React.useState("");
    const [checked, setChecked] = React.useState("");
    const [mealType, setValue] = React.useState("");

    // This frontend function sends a JSON object to backend (routes/log.js) using axios post method, returning to previous screen afterwards
    function onSaveLog() {
        axios
            .post("http://localhost:5000/log/add", {
                name: foodName,
                calories: calories,
                protein: protein,
                mealType: mealType,
            })
            .then((res) => console.log(res.data))
            .catch(function () {
                console.log("LOG ERROR: Promise rejected (log)");
            });
        navigation.goBack(); // TODO: May want navigation.navigate("HomeTabs") instead
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <StatusBar barStyle="light-content" />

                {/*
                <Appbar.Header>
                    <Appbar.Content title="Log food" />
                    <Appbar.Action icon="magnify" />
                </Appbar.Header>
                */}
                <View style={styles.inner}>
                    <View style={styles.entriesRow}>
                        <Text style={styles.defaultText}>Food name: </Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="required"
                            keyboardAppearance="dark"
                            maxLength={25}
                            value={foodName}
                            onChangeText={setName}
                            clearButtonMode="always"
                        />
                    </View>
                    <RadioButton.Group
                        onValueChange={(mealType) => setValue(mealType)}
                        value={mealType}
                    >
                        <RadioButton.Item
                            value="breakfast"
                            label="Breakfast"
                            status={
                                checked === "breakfast"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() => setChecked(value)}
                            labelStyle={{ color: "white" }}
                            color="deepskyblue"
                        />
                        <RadioButton.Item
                            value="lunch"
                            label="Lunch"
                            status={
                                checked === "lunch" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked(value)}
                            labelStyle={{ color: "white" }}
                            color="deepskyblue"
                        />
                        <RadioButton.Item
                            value="dinner"
                            label="Dinner"
                            status={
                                checked === "dinner" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked(value)}
                            labelStyle={{ color: "white" }}
                            color="deepskyblue"
                        />
                        <RadioButton.Item
                            value="snacks"
                            label="Snacks"
                            status={
                                checked === "snacks" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked(value)}
                            labelStyle={{ color: "white" }}
                            color="deepskyblue"
                        />
                    </RadioButton.Group>
                    <Text style={styles.titleText}>Nutrient Entry</Text>
                    <Caption
                        style={{
                            color: "white",
                            //fontSize: 13,
                            paddingLeft: 10,
                            paddingBottom: 5,
                        }}
                    >
                        Enter in values as they appear on the Nutrition Facts.
                        You can enter in serving size later.
                    </Caption>
                    <View style={styles.entriesRow}>
                        <Text style={styles.defaultText}>Calories: </Text>
                        <TextInput
                            style={styles.inputBox}
                            keyboardType="number-pad"
                            placeholder="required"
                            keyboardAppearance="dark"
                            maxLength={5}
                            textAlign="right"
                            value={calories}
                            onChangeText={setCalories}
                            clearButtonMode="always"
                        />
                    </View>
                    <View style={styles.entriesRow}>
                        <Text style={styles.defaultText}>Protein: </Text>
                        <TextInput
                            style={styles.inputBox}
                            keyboardType="number-pad"
                            placeholder="optional"
                            keyboardAppearance="dark"
                            maxLength={5}
                            textAlign="right"
                            value={protein}
                            onChangeText={setProtein}
                            clearButtonMode="always"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            paddingTop: 10,
                        }}
                    >
                        <AwesomeButton
                            backgroundColor="deepskyblue"
                            backgroundDarker="#1F1F1F"
                            stretch={true}
                            textSize={18}
                            textColor="white"
                            onPress={() => onSaveLog()}
                        >
                            LOG
                        </AwesomeButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        flexDirection: "column",

        //paddingTop: 50,
        //justifyContent: "space-between",
        //alignItems: "center",
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
    inner: {
        //flexDirection: "column",
        //flex: 1,
        //backgroundColor: "#000000",
        justifyContent: "space-around",
        paddingTop: 20,
    },
    entriesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1F1F1F",
        height: "9%",
        borderRadius: 10,
        //padding: 5,
    },
    radioButtonRow: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "#1F1F1F",
        height: "8%",
        color: "white",
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        paddingLeft: 10,
    },
    defaultText: {
        color: "white",
        //paddingLeft: 10,
        fontSize: 19,
        padding: 10, // centers only text in row
    },
});
export default Log;
