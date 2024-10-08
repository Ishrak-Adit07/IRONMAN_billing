import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
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
          console.log(product);
          setProducts(product);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <View>
      {products.map((p, index) => (
        <Text key={index}>
          {p.name} {p.type} {p.price}{" "}
        </Text>
      ))}
    </View>
  );
}
