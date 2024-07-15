import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useSession } from "@/controllers/ctx";
import { Text } from "react-native";

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
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
