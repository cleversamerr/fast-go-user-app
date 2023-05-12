import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Map from "../../components/map";
import HomeBottomSheet1 from "../../components/homeBottomSheet1";
import HamburgerMenu from "../../components/hamburgerMenu";

export default function HomeScreen1({ navigation }) {
  const [locations, setLocations] = useState([]);

  const handleRequestNow = () => {
    navigation.navigate("HomeScreen2");
  };

  const handleAddLocationToFavorites = (location) => {
    // TODO: call API
  };

  const handleSelectLocation = (location) => {
    setLocations([location]);
  };

  const handleDeleteLocation = (event) => {
    const markerLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    const newLocations = locations.filter(
      (location) =>
        location.latitude !== markerLocation.latitude &&
        location.longitude !== markerLocation.longitude
    );

    setLocations(newLocations);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HamburgerMenu />
      <Map
        locations={locations}
        onSelectLocation={handleSelectLocation}
        onMarkerPress={handleDeleteLocation}
      />
      <HomeBottomSheet1
        disableButton={!locations.length}
        disableAddLocation={!locations.length}
        locationTitle={locations[0]?.title}
        onRequestNow={handleRequestNow}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
