import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    SafeAreaView,
    TextInput,
} from "react-native";
import Button from "react-native-paper";
import AwesomeButton from "react-native-really-awesome-button";

const Signin = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headlineRow}>
                <Text style={styles.headlineText}>
                    Welcome to Nutrition Tracker!
                </Text>
            </View>
            <Text style={{ color: "white" }}>E-mail</Text>
            <TextInput
                keyboardAppearance="dark"
                value={email}
                onChangeText={setEmail}
                clearButtonMode="always"
            ></TextInput>
            <Text style={{ color: "white" }}>Password</Text>
            <TextInput
                keyboardAppearance="dark"
                value={password}
                onChangeText={setPassword}
                clearButtonMode="always"
            ></TextInput>
            <AwesomeButton
                backgroundColor="deepskyblue"
                backgroundDarker="#1F1F1F"
                stretch={true}
                textSize={18}
                textColor="white"
                onPress={() => navigation.navigate("HomeTabs")}
            >
                Sign in
            </AwesomeButton>
            <AwesomeButton
                backgroundColor="deepskyblue"
                backgroundDarker="#1F1F1F"
                stretch={true}
                textSize={18}
                textColor="white"
            >
                Sign up
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
    },
    headlineText: {
        color: "white",
    },
    credentialsRow: {
        flexDirection: "row",
    },
});

export default Signin;
