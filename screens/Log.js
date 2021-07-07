import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform
} from "react-native"

const Log = () => {
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <View>
                <Text>Home</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Log;