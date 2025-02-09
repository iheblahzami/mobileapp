import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = ({ route, navigation }) => {
  const { profession } = route.params;
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const validateInput = () => {
    if (!name.trim() || !need.trim()) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      Alert.alert("Error", "Name should only contain letters.");
      return false;
    }
    if (need.trim().length < 5) {
      Alert.alert("Error", "Please provide a more detailed need.");
      return false;
    }
    return true;
  };

 const saveBooking = async () => {
  if (!validateInput()) return;

  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      name: name.trim(),
      need: need.trim(),
      date: date.toDateString(),
      profession: profession.name,
    });
    console.log("Document saved with ID:", docRef.id);
    Alert.alert("Success", "Your booking has been saved!");
    navigation.navigate("Home");
  } catch (error) {
    console.error("Firestore Error:", error);
    Alert.alert("Error", "Failed to save booking. Check Firestore setup.");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book {profession.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Describe your need"
        value={need}
        onChangeText={setNeed}
        multiline
      />

      <View style={styles.dateContainer}>
        <Button title={`Selected Date: ${date.toDateString()}`} onPress={() => setShowPicker(true)} />
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Button title="Submit Booking" color="#007bff" onPress={saveBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  dateContainer: { marginVertical: 10, alignItems: "center" },
});

export default BookingScreen;
