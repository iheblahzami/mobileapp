import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';  // Make sure this path is correct

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      Alert.alert("Deleted!", "Your booking has been removed.");
      loadBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const editBooking = async (id, newData) => {
    try {
      await updateDoc(doc(db, "bookings", id), newData);
      Alert.alert("Updated!", "Your booking has been updated.");
      loadBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>📌 {item.profession}</Text>
            <Text>👤 {item.name}</Text>
            <Text>📝 {item.need}</Text>
            <Text>📅 {item.date}</Text>
            <Button title="Delete" onPress={() => deleteBooking(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', margin: 10, padding: 10, borderRadius: 10 },
  text: { fontSize: 18, fontWeight: 'bold' },
});

export default MyBookingsScreen;
