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
import axios from "axios";

const urlSignin = "http://localhost:5000/users/signin";
const urlSignup = "http://localhost:5000/users/signup";

const Signin = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function onSigninPress() {
        axios
            .post(urlSignin, {
                email: email,
                password: password,
            })
            .then((res) => console.log(res.data))
            .catch((error) => console.log("ERROR: Promise rejected (signin)"));

        navigation.navigate("HomeTabs");
    }
    function onSignupPress() {
        axios
            .post(urlSignup, {
                email: email,
                password: password,
            })
            .then((res) => console.log(res.data))
            .catch(function () {
                console.log("ERROR: Promise rejected (signup)");
            });
        navigation.navigate("HomeTabs");
    }

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
                backgroundColor="white"
                height={40}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            ></TextInput>
            <Text style={{ color: "white" }}>Password</Text>
            <TextInput
                keyboardAppearance="dark"
                value={password}
                onChangeText={setPassword}
                clearButtonMode="always"
                backgroundColor="white"
                height={40}
                autoCapitalize="none"
                autoCorrect={false}
            ></TextInput>
            <AwesomeButton
                backgroundColor="deepskyblue"
                backgroundDarker="#1F1F1F"
                stretch={true}
                textSize={18}
                textColor="white"
                onPress={
                    () => onSigninPress() /*navigation.navigate("HomeTabs")*/
                }
            >
                Sign in
            </AwesomeButton>
            <AwesomeButton
                backgroundColor="deepskyblue"
                backgroundDarker="#1F1F1F"
                stretch={true}
                textSize={18}
                textColor="white"
                onPress={() => onSignupPress()}
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
