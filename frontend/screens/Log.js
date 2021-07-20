import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    StyleSheet,
    Button,
    StatusBar,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

const Log = ({ navigation }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.inner}>
                {/*
                <Button
                    style={{ flexDirection: "row" }}
                    title="< Back"
                    onPress={() => navigation.navigate("Home")}
                />*/}
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Food name </Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="required"
                        keyboardAppearance="dark"
                        maxLength={25}
                    />
                </View>
                <Text style={styles.titleText}>Nutrient Entry</Text>
                <Text
                    style={{
                        color: "white",
                        fontSize: 13,
                        paddingLeft: 10,
                        paddingBottom: 5,
                    }}
                >
                    Enter in values as they appear on the Nutrition Facts. You
                    can enter in serving size later.
                </Text>
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Calories </Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="required"
                        keyboardAppearance="dark"
                        maxLength={5}
                        textAlign="right"
                    />
                </View>
                <View style={styles.entriesRow}>
                    <Text style={styles.defaultText}>Protein </Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="optional"
                        keyboardAppearance="dark"
                        maxLength={5}
                        textAlign="right"
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
                        //width="95%"
                    >
                        LOG
                    </AwesomeButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        flexDirection: "column",
        paddingTop: 50,
        //justifyContent: "space-between",
        //alignItems: "center",
    },
    inputBox: {
        margin: 5,
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
    },
    entriesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1F1F1F",
        height: "10%",
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        paddingLeft: 10,
    },
    defaultText: {
        color: "white",
        paddingLeft: 10,
        fontSize: 19,
    },
});
export default Log;
