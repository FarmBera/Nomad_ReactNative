import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "xxxxxxxx";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rain",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  // const [location, setLocation] = useState();
  const [days, setDays] = useState([2]);
  const [ok, setOk] = useState("true");
  const ask = async () => {
    const permission = await Location.requestForegroundPermissionsAsync;
    const { granted } = await Location.requestForegroundPermissionsAsync;
    if (!granted) {
      setOk(false);
    }
    // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    // console.log(json);
    // console.log(json.daily);
    setDays(json.daily);

    // console.log(permission);
    // console.log(location);
    // console.log(location[0].city);
  };

  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // indicatorStyle="white" // only for iOS
        contentContainerStyle={styles.weather}
      >
        {/* <View style={styles.day}>
          <Text style={styles.temp}>30</Text>
          <Text style={styles.desc}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Cloudy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Cloudy</Text>
        </View> */}
        {/* {days.length === 0 ? ( */}
        {days !== null ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="default"
              size="large"
              style={{ margin: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(2)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                ></Fontisto>
              </View>
              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].descryption}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5da4b",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {
    // flex: 3,
    // backgroundColor: "teal",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "500",
  },
  day: {
    width: SCREEN_WIDTH,
    // flex: 1,
    // backgroundColor: "teal",
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  desc: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
