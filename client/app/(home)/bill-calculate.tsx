import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
// import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/controllers/ctx";

interface Item {
  id: number;
  name: string;
  type: string;
  quantity: number;
  price: number;
}

interface SubmissionItem {
  name: string;
  type: string;
  quantity: number;
  total: number;
}

interface SubmissionData {
  employee: string;
  client: string;
  products: SubmissionItem[];
}

// const { manifest } = Constants.manifest2;

export default function billCalc() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const { userID } = useSession();

  const handleAddItem = async () => {
    if (!name || !type || !quantity) return;

    try {
      const response = await axios.get(
        `http://192.168.0.105:4000/api/product/get/price/${name}/${type}`
      );
      console.log("API Response:", response.data);

      const price = response.data.price;

      const newItem: Item = {
        id: idCounter,
        name,
        type,
        quantity: parseInt(quantity),
        price,
      };

      setItems((newItems) => [...newItems, newItem]);
      setIdCounter(idCounter + 1);

      // Clear the input fields
      setName("");
      setType("");
      setQuantity("");
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const handleSubmit = async () => {
    if (!client) {
      Alert.alert("Please enter client name");
      return;
    } else if (items.length === 0) {
      Alert.alert("Please add items");
      return;
    } else if (!userID) {
      Alert.alert("Please login to submit bill");
      return;
    }

    const submissionData: SubmissionData = {
      employee: userID || "",
      client: client,
      products: items.map((item) => ({
        name: item.name,
        type: item.type,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
    };

    try {
      await axios
        .post("http://192.168.0.105:4000/api/bill/create", submissionData)
        .then((response) => {
          console.log("Submission response:", response.data);
          Alert.alert("Bill submitted successfully");
        });
      setClient("");
      setItems([]);
    } catch (error) {
      console.error("Error submitting data:", error);
      Alert.alert("Error submitting data, try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-center font-bold text-2xl">Bill Page</Text>
      <View className="items-start justify-center w-full h-1 bg-orange-600 mt-4 mb-8"></View>
      <Text className="text-center font-bold text-lg">Client</Text>
      <TextInput
        style={styles.input}
        placeholder="Client name"
        value={client}
        onChangeText={setClient}
      />
      <View className="items-start justify-center w-full h-1 bg-orange-600 mt-4 mb-8"></View>
      <Text className="text-center font-bold text-lg">Items</Text>
      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item type"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>
              {item.name} ({item.type}) x{item.quantity}
            </Text>
            <Text>${item.price * item.quantity}</Text>
          </View>
        )}
      />
      <Button title="Submit Bill" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
