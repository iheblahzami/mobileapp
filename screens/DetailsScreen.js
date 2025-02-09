import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const { profession } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${profession.phone || '0021625475991'}`); // Use real phone number
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${profession.email || 'siiheb64@gmail.com'}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{profession.name || 'Unknown Profession'}</Text>
        <Text style={styles.subtitle}>🔹 {profession.category || 'No category'}</Text>
        <Text style={styles.description}>📌 {profession.description || 'No description available'}</Text>
        <Text style={styles.contact}>📞 {profession.phone || 'N/A'}</Text>
        <Text style={styles.contact}>📧 {profession.email || 'N/A'}</Text>

        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>📞 Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>📧 Email</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.bookButton]} 
          onPress={() => navigation.navigate('Booking', { profession })}
        >
          <Text style={styles.buttonText}>📅 Book Service</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 15, color: '#777' },
  contact: { fontSize: 16, color: '#333', marginBottom: 5 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  bookButton: { backgroundColor: '#28A745' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginTop: 20 },
  backButtonText: { color: '#007BFF', fontSize: 16, fontWeight: 'bold' },
});

export default DetailsScreen;
