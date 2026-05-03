import * as Location from 'expo-location';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [location, setLocation] = useState<any>(null);


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  return (
    <View style={styles.container}>
      <Button title="Get My Location" onPress={getLocation} />

      {location && (
        <Text>
          Latitude: {location.latitude} {'\n'}
          Longitude: {location.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});