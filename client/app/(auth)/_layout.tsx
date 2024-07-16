import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useSession } from "@/controllers/ctx";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UnAuthenticatedLayout() {
  // const { isSignedIn } = useAuth();
  const { isLoading, session } = useSession();

  // if (isSignedIn) {
  //   return <Redirect href={"/"} />;
  // }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (session) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ header: () => null }} />;
}
