// import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useSession } from "@/controllers/ctx";

export default function Page() {
  // const { user } = useUser();
  // const { signOut } = useClerk();
  const { signOut, session } = useSession();
  const router = useRouter();

  return (
    <View className="flex-1">
      <Image
        className="basis-1/2"
        source={require("../.././assets/images/ironman.svg")}
        contentFit="fill"
        transition={1000}
      />
      {/* <SignedIn> */}
      {session && (
        <View className="flex-auto items-center bg-white">
          {/* <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text> */}
          <Pressable
            className="mt-5 border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 justify-center self-center"
            onPress={() => {
              signOut();
              router.replace("/");
            }}
          >
            <Text className="self-center text-lg font-bold">Sign Out</Text>
          </Pressable>
          <Pressable className="border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 items-center justify-center">
            <Link href="/bill-calculate">
              <Text className="text-lg font-bold text-center">Make Bill</Text>{" "}
            </Link>
          </Pressable>
        </View>
      )}
      {/* </SignedIn> */}
      {/* <SignedOut> */}
      {!session && (
        <View className="flex-1 items-center bg-white">
          <Pressable className="border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 items-center justify-center">
            <Link href="/sign-in" className="mt-2 mb-2">
              <Text className="text-xl font-bold text-center">Sign In</Text>
            </Link>
          </Pressable>
          <Pressable className="border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 items-center justify-center">
            <Link href="/sign-up">
              <Text className="text-lg font-bold text-center">Sign Up</Text>{" "}
            </Link>
          </Pressable>
        </View>
      )}
      {/* </SignedOut> */}
    </View>
  );
}
