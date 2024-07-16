import * as React from "react";
import { TextInput, Button, View, Pressable, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useSession } from "@/controllers/ctx";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  // const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { signUp } = useSession();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // const onSignUpPress = async () => {
  //   if (!isLoaded) {
  //     return;
  //   }

  //   try {
  //     await signUp.create({
  //       emailAddress,
  //       password,
  //     });

  //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

  //     setPendingVerification(true);
  //   } catch (err: any) {
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // };

  // const onPressVerify = async () => {
  //   if (!isLoaded) {
  //     return;
  //   }

  //   try {
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code,
  //     });

  //     if (completeSignUp.status === "complete") {
  //       await setActive({ session: completeSignUp.createdSessionId });
  //       router.replace("/");
  //     } else {
  //       console.error(JSON.stringify(completeSignUp, null, 2));
  //     }
  //   } catch (err: any) {
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // };

  return (
    <SafeAreaView className="flex-auto bg-slate-300">
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            className="mt-10 basis-14 w-4/5 pl-2 bg-gray-300 self-center justify-center border rounded-md"
            value={emailAddress}
            placeholder="User Name..."
            placeholderTextColor={"#000003"}
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            className="mt-3 basis-14 w-4/5 pl-2 bg-gray-300 self-center justify-center border rounded-md"
            value={password}
            placeholder="Password..."
            placeholderTextColor={"#000003"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Pressable
            className="mt-5 border-2 border-blue-600 bg-orange-400 rounded-md h-14 w-40 justify-center self-center"
            onPress={() => {
              signUp(emailAddress, password);
              router.replace("/");
            }}
          >
            <Text className="self-center text-lg font-bold">SignUp</Text>
          </Pressable>
        </>
      )}
      {/* {pendingVerification && (
        <>
          <TextInput
            className="mt-3 basis-14 w-4/5 pl-2 bg-gray-300 self-center justify-center border rounded-md"
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Pressable
            className="mt-5 border-2 border-indigo-500 border-b-indigo-500 bg-orange-400 rounded-md h-12 w-40 justify-center self-center"
            onPress={onPressVerify}
          >
            <Text className="self-center text-lg font-bold">Verify Email</Text>
          </Pressable>
        </>
      )} */}
    </SafeAreaView>
  );
}
