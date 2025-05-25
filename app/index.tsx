import RegionChanger from "@/components/RegionChanger";
import getHolidayData from "@/lib/getHolidayData";
import getRegion from "@/lib/getRegion";
import { useOrientation } from "@/lib/useOrientation";
import { Region } from "@/types/holiday";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [data, setData] = useState<{ label: string, daysLeft: number, image: any } | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const orientation = useOrientation();

  getRegion().then(region => {
    setRegion(region);

    if (region)
      getDataUntilHoliday(region).then(setData);
  });

  if (!data || !region) {
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
    <View style={{ display: "flex", flexDirection: "column", flex: 1, padding: 10, }}>
      <View
        style={orientation === "LANDSCAPE" ? { display: "flex", flexDirection: "row", gap: 10} : {}}
      >
        <ImageBackground
        source={data.image}
        style={{ height: 200, borderRadius: 10, overflow: "hidden", marginBottom: 10, flex: 1 }}
        imageStyle={{ borderRadius: 10 }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            flex: 1,
            borderRadius: 10,
            padding: 10,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24, }}>Days t'll {data.label}:</Text>
          <Text style={{ fontWeight: "bold", fontSize: 24, color: "#fff", alignSelf:"flex-end", marginTop: "auto" }}>{data.daysLeft} days</Text>
        </View>
      </ImageBackground>

      <Pressable 
        android_ripple={{ color: "#000000hh" }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => router.push("/allVacations")}
      >
        <Text>All vacations</Text>
        <MaterialIcons name="arrow-right-alt" size={24}/>
      </Pressable>
      </View>

      <RegionChanger region={region}/>
    </View>
  );
}

async function getDataUntilHoliday(region: Region): Promise<{ label: string, daysLeft: number, image: any } | null> {
  const year = new Date().getFullYear();

  let holidayData = await getHolidayData(year - 1);

  const startDate = holidayData.vacations[holidayData.vacations.length - 1]?.regions?.find(date => date.region === region)?.startdate;

  if (!startDate || new Date(startDate).getTime() < new Date().getTime()) {
    holidayData = await getHolidayData(year);
  }

  let nextHoliday = holidayData.vacations
    .map(vacation => { return { 
      type: vacation.type, 
      ...(vacation.regions.length === 1 ? vacation.regions[0] : vacation.regions.find(date => date.region === region)) 
      } 
    })
    .filter(date => date.startdate && new Date(date.startdate) > new Date())[0];

  if (nextHoliday) {
    let image; const holidayType = nextHoliday.type.trim().toLowerCase();
    if (holidayType.includes("winter")) {
      image = require("@/assets/images/seasons/winter.jpg");
    } else if (holidayType.includes("zomer")) {
      image = require("@/assets/images/seasons/summer.jpg");
    } else if (holidayType.includes("herfst")) {
      image = require("@/assets/images/seasons/autumn.jpg");
    } else if (holidayType.includes("voorjaars") || holidayType.includes("mei"))
      image = require("@/assets/images/seasons/spring.jpg");

    return {
      label: nextHoliday.type.trim(),
      daysLeft: Math.ceil((new Date(nextHoliday.startdate || "").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      image,
    };
  }

  return {
    label: "no holiday",
    daysLeft: 0,
    image: null,
  };
}
