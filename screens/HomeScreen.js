import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const professions = [
  { id: '1', name: 'Plumber', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Gardener', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Electrician', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Carpenter', image: 'https://via.placeholder.com/150' },
];


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={professions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { profession: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="View My Bookings" onPress={() => navigation.navigate('MyBookings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f4f4f4' },
  card: { backgroundColor: '#fff', margin: 10, padding: 10, borderRadius: 10, alignItems: 'center' },
  image: { width: 150, height: 150, borderRadius: 10 },
  text: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
