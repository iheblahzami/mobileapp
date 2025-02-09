import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { Card } from "react-native-paper";

const professions = [
  { id: '1', name: 'Plumber', image: require('../assets/plumber-cartoon-colored-clipart-illustration-2PNTBJY.jpg') },
  { id: '2', name: 'Gardener', image: require('../assets/R.jpg') },
  { id: '3', name: 'Electrician', image: require('../assets/electricien-30694651.webp') },
  { id: '4', name: 'Carpenter', image: require('../assets/pngtree-carpenter-clipart-builder-working-with-tools-on-a-woodworking-workbench-cartoon-png-image_11079654.png') },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={professions}
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
      <Button title="View My Bookings" onPress={() => navigation.navigate('MyBookings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f4f4f4' },
  card: { 
    backgroundColor: '#fff', 
    margin: 10, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    elevation: 5,  // Adds shadow on Android
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: { width: 150, height: 150, borderRadius: 10 },
  text: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
