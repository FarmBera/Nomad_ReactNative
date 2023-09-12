import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, // 터치 시, 투명도 조절
  TouchableHighlight, // 터치 시, 배경색 바뀌게
  TouchableWithoutFeedback, // 클릭 피드백 없음
  Pressable,
  TextInput,
  ScrollView,
  Alert, // Advanced Toucuable~
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { theme } from "./color";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    // const s = JSON.stringify(toSave);
    // AsyncStorage.setItem("@toDos", s);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(s);
    setToDos(JSON.parse(s));
  };
  const addTodo = async () => {
    if (text === "") return;
    // alert(text);
    // Save TODO
    const newToDos = { ...toDos, [Date.now()]: { text, working } };

    // Object.assign({}, toDos, {
    //  [Date.now()]: { text, work: working },
    // });
    setToDos(newToDos);
    await saveToDos(newToDos);
    // console.log(toDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete ToDo", "Are you sure to PERMANENTLY delete this?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
    return;
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            console.log("Work Pressed");
            work();
          }}
        >
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Travel Pressed");
            travel();
          }}
          // activeOpacity={0.5}
          // underlayColor="#ddd"
        >
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={working ? "Add some ToDo" : "Where?"}
          // keyboardType="nun" // 키보드 타입 설정
          // returnKeyType="Done"
          // returnKeyLabel="gogo" // 엔터 키 이름 설정
          // autoCapitalize="true"
          onSubmitEditing={addTodo}
        ></TextInput>

        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // padding: "0px 10px"
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
