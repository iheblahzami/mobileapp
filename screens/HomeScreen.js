import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button, TextInput } from 'react-native';
import { Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons'; // For the search icon

const professions = [
  { id: '1', name: 'Plumber', image: require('../assets/plumber-cartoon-colored-clipart-illustration-2PNTBJY.jpg') },
  { id: '2', name: 'Gardener', image: require('../assets/R.jpg') },
  { id: '3', name: 'Electrician', image: require('../assets/electricien-30694651.webp') },
  { id: '4', name: 'Carpenter', image: require('../assets/pngtree-carpenter-clipart-builder-working-with-tools-on-a-woodworking-workbench-cartoon-png-image_11079654.png') },
];

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessions = professions.filter(profession =>
    profession.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search professions..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* FlatList for Professions */}
      <FlatList
        data={filteredProfessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { profession: item })}>
            <Card style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Card.Content>
                <Text style={styles.text}>{item.name}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* View My Bookings Button */}
      <Button title="View My Bookings" onPress={() => navigation.navigate('MyBookings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f4f4f4' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchBar: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: { width: 150, height: 150, borderRadius: 10 },
  text: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;