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
                <View style={styles.row}>
                    <Text style={{ color: "white" }}>Name: </Text>
                    <TextInput
                        style={{ height: 40 }}
                        placeholder="Name of food"
                        keyboardType="default"
                    />
                </View>
                <View style={{ alignSelf: "center" }}>
                    <Button title="Log" /*onPress={}*/></Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flexDirection: "column",
        backgroundColor: "#000000",
        justifyContent: "space-around",
    },
    row: {
        flexDirection: "row",
    },
});
export default Log;
