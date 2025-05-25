import { useOrientation } from "@/lib/useOrientation";
import { Text, View } from "react-native";

export default function About() {
  const orientation = useOrientation();

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <View style={{ 
          flexDirection: orientation === "LANDSCAPE" ? "row" : undefined,
          alignItems: "center",
          justifyContent: orientation === "LANDSCAPE" ? "center" : undefined,
          gap: 10,
        }}
      >
        <View style={{ borderRadius: 2000, height: 100, width: 100, backgroundColor: "#666"}}></View>
        <View style={{ alignItems: "center", }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Holiday App</Text>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>© 2025 Koert Weber</Text>
        </View>
      </View>
    </View>
  );
}
