import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Old_App() {
  return (
    // div === View
    // span, p === Text
    /* <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.sefont}>New Text!</Text>
      <Text>testtestsets</Text>
      <StatusBar style="auto" /> */

    /** View 태그는 기본적으로 flex container
     * 기본 flexDirection: Column (row 아님 )
     */
    // 이렇게 사용하면 안됨
    /* <View style={{ flexDirection: "row" }}>
      <View style={{ width: 200, height: 200, backgroundColor: "tomato" }} ></View>
      <View style={{ width: 200, height: 200, backgroundColor: "teal" }}></View>
      <View style={{ width: 200, height: 200, backgroundColor: "orange" }}
      ></View>
    </View> */

    // 대신 이렇게 사용

    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 1, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}

// style components
// 일부 스타일은 사용할 수 없음
// StyleSheet.create: 자동완성 기능 지원하므로, 사용 권장
// CSS 오류나면 알려줌 개꿇
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
