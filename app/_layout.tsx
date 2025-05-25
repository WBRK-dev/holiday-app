import { SessionProvider } from "@/components/SessionContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Provider } from "react-native-paper";

export default function RootLayout() {
  return <SessionProvider>
    <Provider>
      <Stack>
        <Stack.Screen name="index" options={{ ...actionButtons, title: "Home" }} />
        <Stack.Screen name="allVacations" options={{ title: "All Vacations" }} /> 
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </Provider>
  </SessionProvider>;
}

const stylesheet = StyleSheet.create({
  link: {
    paddingHorizontal: 10,
  }
});

const actionButtons = {
  headerRight: () => {
    return (
      <>
        <Link
          href="/about"
          style={stylesheet.link}
        ><MaterialIcons name="info" size={20}/></Link>
        <Link
          href="/settings"
          style={{ ...stylesheet.link, marginRight: 10 }}
        ><MaterialIcons name="settings" size={20}/></Link>
      </>
    );
  }
};