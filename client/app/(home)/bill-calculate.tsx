import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  type: string;
  quantity: number;
  price: number;
}

export default function App() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleAddItem = async () => {
    if (!name || !type || !quantity) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/product/get/:name/:type",
        {
          name,
          type,
        }
      );

      const price = response.data.price;

      const newItem: Item = {
        id: idCounter,
        name,
        type,
        quantity: parseInt(quantity),
        price,
      };

      setItems([...items, newItem]);
      setIdCounter(idCounter + 1);

      // Clear the input fields
      setName("");
      setType("");
      setQuantity("");
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  return (
    <View style={styles.container}>
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
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
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
