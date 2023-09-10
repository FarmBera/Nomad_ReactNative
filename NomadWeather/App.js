import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // div === View
    // span, p === Text
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.sefont}>New Text!</Text>
      <Text>testtestsets</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// style components
// 일부 스타일은 사용할 수 없음
// StyleSheet.create: 자동완성 기능 지원하므로, 사용 권장
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sefont: {
    color: "blue",
    fontSize: 30,
  },
});
