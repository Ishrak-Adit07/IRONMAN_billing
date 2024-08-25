import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Item {
  id: string;
  name: string;
  price: number;
  type: string;
}

// const data: Item[] = [
//   { id: "668cf7aad04178f62045", name: "Pant", price: 12, type: "Iron" },
//   { id: "668d1850002e54fa9b0a", name: "Shirt", price: 20, type: "Laundry" },
//   { id: "668d186a0004b10c1c85", name: "Shirt", price: 100, type: "Drywash" },
//   { id: "668d187c00342185d322", name: "CottonShirt", price: 20, type: "Iron" },
//   { id: "668d188d00350498f8fa", name: "Pant", price: 20, type: "Laundry" },
//   { id: "668d188d00350498f8di", name: "Pant", price: 40, type: "Ultrawash" },
// ];

const Products2: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fectcData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.105:4000/api/product/get"
        );
        if (response.data.success) {
          const product = response.data.products.map((p: any) => ({
            id: p.$id,
            name: p.name,
            price: p.price,
            type: p.type,
          }));

          setData(product);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fectcData();
  }, []);

  // Group data by service type
  const groupedData: Record<string, Item[]> = data.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  if (loading) {
    return <ActivityIndicator size={"large"} color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-center font-bold text-2xl">Services</Text>
      <View className="items-start justify-center w-full h-1 bg-orange-600 mt-4 mb-8"></View>
      {Object.keys(groupedData).map((serviceType) => (
        <View key={serviceType} style={styles.row}>
          <View style={styles.serviceColumn}>
            <Text style={styles.serviceText}>{serviceType}</Text>
          </View>
          <View style={styles.itemColumn}>
            {groupedData[serviceType]?.map((item, index) => (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.priceText}>${item.price}</Text>
                </View>
                {/* Divider line */}
                {index < groupedData[serviceType].length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  serviceColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  itemColumn: {
    flex: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  serviceText: {
    fontWeight: "bold",
  },
  itemText: {
    marginBottom: 5,
  },
  priceText: {
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Products2;
