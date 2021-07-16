import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    StyleSheet,
    Button,
} from "react-native";

const Log = ({ navigation }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
        >
            <View style={styles.inner}>
                <Button
                    style={styles.row}
                    title="Back"
                    onPress={() => navigation.navigate("Home")}
                />
                <View style={styles.entriesRow}>
                    <Text
                        style={{
                            color: "white",
                            paddingLeft: 10,
                        }}
                    >
                        Food name{" "}
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="required"
                        keyboardAppearance="dark"
                        maxLength={25}
                    />
                </View>
                <Text
                    style={{ color: "white", padding: 10, fontWeight: "bold" }}
                >
                    Nutrient Entry
                </Text>
                <Text
                    style={{
                        color: "white",
                        fontSize: 10,
                        paddingLeft: 10,
                        paddingBottom: 5,
                    }}
                >
                    Enter in values as they appear on the Nutrition Facts. You
                    can enter in serving size later.
                </Text>
                <View style={styles.entriesRow}>
                    <Text
                        style={{
                            color: "white",
                            paddingLeft: 10,
                        }}
                    >
                        Calories{" "}
                    </Text>
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
                    <Text
                        style={{
                            color: "white",
                            paddingLeft: 10,
                        }}
                    >
                        Protein{" "}
                    </Text>
                    <TextInput
                        style={styles.inputBox}
                        keyboardType="number-pad"
                        placeholder="optional"
                        keyboardAppearance="dark"
                        maxLength={5}
                        textAlign="right"
                    />
                </View>
                <View style={{ alignSelf: "center", paddingTop: 10 }}>
                    <Button title="Log" /*onPress={}*/></Button>
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
        paddingTop: 20,
        //justifyContent: "space-between",
        //alignItems: "center",
    },
    inputBox: {
        margin: 5,
        //flex: 1,  // This flex will override justifyContent in entriesRow below
        borderBottomColor: "deepskyblue",
        borderBottomWidth: 1,
        color: "white",
        textAlign: "right",
    },
    inner: {
        //flexDirection: "column",
        //backgroundColor: "#000000",
        justifyContent: "space-around",
    },
    entriesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1F1F1F",
    },
    row: {
        flexDirection: "row",
    },
});
export default Log;
