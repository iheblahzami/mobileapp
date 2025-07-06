import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = ({ route, navigation }) => {
  const { profession } = route.params;
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const validateInput = () => {
    if (!name.trim() || !need.trim() || !address.trim()) {
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
    if (address.trim().length < 5) {
      Alert.alert("Error", "Please provide a valid address.");
      return false;
    }
    return true;
  };

  // Enhanced email notification with better error handling
  const sendEmailNotification = async (bookingDetails) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased timeout
      
      const response = await fetch("http://192.168.1.157:5000/api/send-email", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(bookingDetails),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log("Email sent successfully");
        // Optional: Show success message
      } else {
        throw new Error(result.message || "Email sending failed");
      }
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn("Email sending timed out");
        Alert.alert("Notice", "Email notification may be delayed. Your booking was still saved.");
      } else {
        console.error("Email error:", error);
        Alert.alert("Notice", "Email notification failed, but your booking was saved successfully.");
      }
    }
  };

  // Enhanced booking save with better error handling
  const saveBooking = async () => {
    if (!validateInput()) return;

    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        name: name.trim(),
        need: need.trim(),
        address: address.trim(),
        date: date.toDateString(),
        profession: profession.name,
        createdAt: new Date().toISOString(),
      });

      console.log("Document saved with ID:", docRef.id);
      Alert.alert("Success", "Your booking has been saved!");

      // Send email notification (non-blocking)
      sendEmailNotification({
        name: name.trim(),
        need: need.trim(),
        address: address.trim(),
        date: date.toDateString(),
        profession: profession.name,
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Firestore Error:", error);
      Alert.alert("Error", "Failed to save booking. Please check your connection and try again.");
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

      <TextInput
        style={styles.input}
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.dateContainer}>
        <Button
          title={`Selected Date: ${date.toDateString()}`}
          onPress={() => setShowPicker(true)}
        />
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