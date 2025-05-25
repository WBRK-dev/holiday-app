import { DefaultRegion } from "@/types/settings";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { Text, View } from "react-native";
import DropdownSelect from "react-native-input-select";

export default function Settings() {
  let [defaultRegion, setDefaultRegion] = useState<DefaultRegion>("gps");

  AsyncStorage.getItem('defaultRegion').then(val => {
    if (val)
      setDefaultRegion(val as DefaultRegion);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Standard Region</Text>
      <DropdownSelect
        placeholder="Select an option..."
        options={[
          { label: "From GPS", value: "gps" },
          { label: "North", value: "noord" },
          { label: "Central", value: "midden" },
          { label: "South", value: "zuid" },
        ]}
        selectedValue={defaultRegion}
        onValueChange={(item) => {
          setDefaultRegion(item as DefaultRegion);
          AsyncStorage.setItem('defaultRegion', item as DefaultRegion);
        }}
        primaryColor={'green'}
      />
    </View>
  );
}
