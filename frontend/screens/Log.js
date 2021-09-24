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
  ScrollView,
} from "react-native";
import axios from "axios";
import AwesomeButton from "react-native-really-awesome-button";
import { RadioButton, Caption, Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  GREYBG,
  GREY,
  RED,
  BLACK,
  GREEN,
  BLUE,
  LTGREY,
} from "../config/constants";

const urlLog = "http://localhost:5000/log/add";

const daysLogGetURL = "http://localhost:5000/daysLog/getLog/";
const daysLogUpdateURL = "http://localhost:5000/daysLog/update/";
const daysLogAddURL = "http://localhost:5000/daysLog/add/";

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
  const [fats, setFats] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [checked, setChecked] = React.useState("");
  const [mealType, setValue] = React.useState("");
  const [userID, setUserID] = React.useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setUserID(value);
        //console.log(value);
      }
    } catch (error) {
      console.log("Error reading AsyncStorage value: " + error);
    }
  };
  getData();

  // This frontend function sends a JSON object to backend (routes/log.js) using axios post method, returning to previous screen afterwards
  function onSaveLog() {
    // passes the user entered data to routes in the backend..
    axios({
      method: "post",
      url: urlLog,
      data: {
        user: userID,
        name: foodName,
        calories: calories,
        protein: protein,
        fats: fats,
        carbs: carbs,
        mealType: mealType,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function () {
        console.log("LOG ERROR: promise rejected");
      });

    // Add to daysLog collection too
    axios({
      method: "post",
      url: daysLogUpdateURL,
      data: {
        user: userID,
        calories: calories,
        protein: protein,
        fats: fats,
        carbs: carbs,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log("ERROR (frontend/daysLog): " + error));
    /* (DELETE)
        async function addToDaysLog() {
            const response = await axios.get(daysLogGetURL + userID);
            const data = await response.data;

            //console.log("AddToDaysLog: " + data[0].totalCalories);
            console.log("AddToDaysLog length: " + response.data.length);

            if (response.data.length !== 0) {
                axios
                    .post(daysLogAddURL, {
                        user: userID,
                        calories: response.data[0].totalCalories + calories,
                        protein: response.data[0].totalProtein + protein,
                    })
                    .then((res) => console.log(res.data))
                    .catch((error) =>
                        console.log("Error (frontend/EXISTS) -> " + error)
                    );
            } else {
                axios
                    .post(daysLogAddURL, {
                        user: userID,
                        calories: calories,
                        protein: protein,
                    })
                    .then((res) => console.log(res.data))
                    .catch((error) =>
                        console.log("Error (frontend/DOESNT) -> " + error)
                    );
            }
        }
        addToDaysLog();
        */

    /*
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
        */
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="light-content" />
        {/*
                <Appbar.Header>
                    <Appbar.Content title="Log food" />
                    <Appbar.Action icon="magnify" />
                </Appbar.Header>
                */}
        <View style={styles.inner}>
          <View style={styles.entriesRow}>
            <Text style={styles.defaultText}>Food name</Text>
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
              status={checked === "breakfast" ? "checked" : "unchecked"}
              onPress={() => setChecked(value)}
              labelStyle={{ color: "white", fontSize: hp(2.1) }}
              color={BLUE}
            />
            <RadioButton.Item
              value="lunch"
              label="Lunch"
              status={checked === "lunch" ? "checked" : "unchecked"}
              onPress={() => setChecked(value)}
              labelStyle={{ color: "white", fontSize: hp(2.1) }}
              color={BLUE}
            />
            <RadioButton.Item
              value="dinner"
              label="Dinner"
              status={checked === "dinner" ? "checked" : "unchecked"}
              onPress={() => setChecked(value)}
              labelStyle={{ color: "white", fontSize: hp(2.1) }}
              color={BLUE}
            />
            <RadioButton.Item
              value="snacks"
              label="Snacks"
              status={checked === "snacks" ? "checked" : "unchecked"}
              onPress={() => setChecked(value)}
              labelStyle={{ color: "white", fontSize: hp(2.1) }}
              color={BLUE}
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
            Enter in values as they appear on the Nutrition Facts. You can enter
            in serving size later.
          </Caption>
          <View style={styles.entriesRow}>
            <Text style={styles.defaultText}>Calories</Text>
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
            <Text style={styles.defaultText}>Protein</Text>
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
          <View style={styles.entriesRow}>
            <Text style={styles.defaultText}>Fats</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="number-pad"
              placeholder="optional"
              keyboardAppearance="dark"
              maxLength={5}
              textAlign="right"
              value={fats}
              onChangeText={setFats}
              clearButtonMode="always"
            />
          </View>
          <View style={styles.entriesRow}>
            <Text style={styles.defaultText}>Carbs</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="number-pad"
              placeholder="optional"
              keyboardAppearance="dark"
              maxLength={5}
              textAlign="right"
              value={carbs}
              onChangeText={setCarbs}
              clearButtonMode="always"
            />
          </View>
          {/*
                    <View
                        style={{
                            flexDirection: "row",
                            alignSelf: "center",
                            paddingTop: 10,
                        }}
                    >
                        <AwesomeButton
                            backgroundColor={BLUE}
                            backgroundDarker="#1F1F1F"
                            stretch={true}
                            textSize={18}
                            textColor="white"
                            onPress={() => onSaveLog()}
                        >
                            LOG
                        </AwesomeButton>
                    </View>
                    */}
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              paddingTop: 5,
            }}
          >
            <AwesomeButton
              backgroundColor={BLUE}
              backgroundDarker={GREYBG}
              stretch={true}
              textSize={18}
              textColor="white"
              onPress={() => onSaveLog()}
            >
              LOG
            </AwesomeButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    flexDirection: "column",

    //paddingTop: 50,
    //justifyContent: "space-between",
    //alignItems: "center",
  },
  inputBox: {
    margin: 4,
    //flex: 1,  // This flex will override justifyContent in entriesRow below
    borderBottomColor: BLUE,
    borderBottomWidth: 1,
    width: "30%",
    color: "white",
    textAlign: "right",
  },
  inner: {
    //flexDirection: "column",
    //flex: 1,
    //backgroundColor: BLACK,
    justifyContent: "space-around",
    paddingTop: 20,
  },
  entriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GREYBG,
    //height: "7%",
    borderRadius: 10,
    margin: 1,
    //padding: 5,
  },
  radioButtonRow: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: GREYBG,
    height: "8%",
    //margin: 1,
    color: "white",
  },
  titleText: {
    fontSize: hp(3.8), // 30
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  defaultText: {
    color: "white",
    //paddingLeft: 10,
    fontSize: hp(2.3), //19
    padding: 10, // centers only text in row
  },
});
export default Log;
