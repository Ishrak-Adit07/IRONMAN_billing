import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    // <SafeAreaView>
    <Stack screenOptions={{ header: () => null }} />
    // </SafeAreaView>
  );
}
