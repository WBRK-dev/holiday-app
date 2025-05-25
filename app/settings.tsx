import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Algemeen() {
  let [value, setValue] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
      }}
    >
      <Text style={{
        fontWeight: "bold",
        fontSize: 20,
      }}>Test</Text>
      <TextInput placeholder="Test" style={{
        backgroundColor: "white",
        borderColor: "#cccccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%",
      }} value={value} onChangeText={setValue}/>
      <Button title="Test" onPress={() => Alert.alert("Value", value)}/>
    </View>
  );
}
