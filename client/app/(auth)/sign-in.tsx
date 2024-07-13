import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, Pressable, Alert } from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const showAlert = () => {
    Alert.alert(
      "SignIN Failed",
      "Can't find your account",
      [
        {
          text: "Cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        alert("ok");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      showAlert();
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-auto bg-slate-300">
      <TextInput
        className="mt-14 mb-4 basis-14 w-4/5 pl-2 bg-gray-300 self-center justify-center border rounded-md"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        placeholderTextColor={"#000003"}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className="basis-14 w-4/5 pl-2 bg-gray-300 self-center justify-center border rounded-md"
        value={password}
        placeholder="Password..."
        placeholderTextColor={"#000003"}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Pressable
        className="mt-5 border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 justify-center self-center"
        onPress={onSignInPress}
      >
        <Text className="self-center text-xl font-bold">Sign In</Text>
      </Pressable>
      <View className="flex items-center justify-center">
        <Text className="mt-5 basis-8 text-lg text-red-600 font-bold self-center">
          Don't have an account?
        </Text>
        <Pressable className="border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 items-center justify-center">
          <Link href="/sign-up">
            <Text className="text-lg font-bold text-center">Sign Up</Text>{" "}
          </Link>
        </Pressable>
      </View>
    </View>
  );
}
