import getHolidayData from "@/lib/getHolidayData";
import getRegion from "@/lib/getRegion";
import translateRegion from "@/lib/translateRegion";
import { HolidayData, HolidayDataDates, Region } from "@/types/holiday";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import DropdownSelect from "react-native-input-select";
import { TFlatList } from "react-native-input-select/lib/typescript/src/types/index.types";

export default function AllVacations() {
  const [data, setData] = useState<HolidayData | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [year, setYear] = useState<number>((new Date()).getFullYear());

  getHolidayData(year).then(setData);
  getRegion().then(setRegion);

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
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
      <DropdownSelect
        placeholder="Select an option..."
        options={getDropdownItems()}
        selectedValue={year}
        onValueChange={(item) => {
          setYear(item?.valueOf() as number);
          setData(null);
        }}
        primaryColor={'green'}
      />

      {data.vacations?.map((vacation, index) => (
        <View
          key={index}
          style={{
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{vacation.type.trim()}</Text>
          <Text style={{ fontSize: 16 }}>{getDateByRegion(region, vacation.regions)}</Text>
        </View>
      ))}
    
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "auto" }}>
        <Text style={{ }}>Region: {translateRegion(region)} • </Text>
        <Text style={{ color: "#4D00FF", textDecorationLine: "underline" }} onPress={console.log}>Change</Text>
      </View> 
    </ScrollView>
  );
}

function getDateByRegion(region: Region, dates: HolidayDataDates[]) {
  let date;
  if (dates.length === 1)
    date = dates[0];
  else
    date = dates.find(date => date.region === region);

  if (!date)
    return "No date available";

  const startDate = new Date(date.startdate);
  const endDate = new Date(date.enddate);

  return `Van ${formatDate(startDate)} tot ${formatDate(endDate)}`;
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("nl-NL", options);
}

function getDropdownItems(): TFlatList {
  const year = (new Date()).getFullYear();
  return [
    { label: `${year} - ${year + 1}`, value: year, },
    { label: `${year - 1} - ${year}`, value: year - 1, },
  ]
}