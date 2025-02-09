import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const { profession } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:123456789`); // Replace with real phone number
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profession.name}</Text>
      <Button title="Call" onPress={handleCall} />
      <Button title="Book Service" onPress={() => navigation.navigate('Booking', { profession })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default DetailsScreen;
