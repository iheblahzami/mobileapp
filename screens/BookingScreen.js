import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookingScreen = ({ route, navigation }) => {
  const { profession } = route.params;
  const [name, setName] = useState('');
  const [need, setNeed] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saveBooking = async () => {
    if (!name || !need) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      name,
      need,
      date: date.toDateString(),
      profession: profession.name,
    };

    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      bookings.push(newBooking);
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      Alert.alert('Success', 'Your booking has been saved!');
      navigation.navigate('Home'); // Go back to home screen
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save booking.');
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

     
      
      <Button
  title={`Selected Date: ${date.toDateString()}`}
  onPress={() => Alert.alert("Date Picker", "Feature temporarily disabled.")}
/>



      <Button title="Submit Booking" onPress={saveBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default BookingScreen;
