import getHolidayData from "@/lib/getHolidayData";
import { HolidayData } from "@/types/holiday";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function About() {
  const [data, setData] = useState<HolidayData | null>(null);

  getHolidayData().then(setData);

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <Text>Data loaded!</Text>
      <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    </View>
  );
}
