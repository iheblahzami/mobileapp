import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { collection, getDocs, query } from "firebase/firestore";
import { RefreshControl } from 'react-native';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Add useEffect to load bookings when component mounts
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const q = query(collection(db, "bookings"));
      const querySnapshot = await getDocs(q);
      const bookingsData = [];
     
      querySnapshot.forEach((doc) => {
        bookingsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
     
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error loading bookings:", error);
      Alert.alert("Error", "Failed to load bookings");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>📌 {item.profession}</Text>
            <Text>👤 {item.name}</Text>
            <Text>📝 {item.need}</Text>
            <Text>📍 {item.address}</Text>
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