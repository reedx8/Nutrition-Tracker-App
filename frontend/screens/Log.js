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
            style={{ flex: 1 }}
        >
            <Button
                style={styles.container}
                title="Back"
                onPress={() => navigation.navigate("Home")}
            />
            <View style={styles.container}>
                <Text>Name: </Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Name of food"
                    keyboardType="default"
                />
            </View>
            <View style={{ alignSelf: "center" }}>
                <Button title="Log" /*onPress={}*/></Button>
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});
export default Log;
