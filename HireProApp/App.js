import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingScreen from './screens/BookingScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Services' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Service Details' }}
        />
        <Stack.Screen 
          name="Booking" 
          component={BookingScreen} 
          options={{ title: 'Book Service' }}
        />
        <Stack.Screen 
          name="MyBookings" 
          component={MyBookingsScreen} 
          options={{ title: 'My Bookings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}