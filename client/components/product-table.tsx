import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface LaundryItem {
  name: string;
  price: number;
  type: string;
}

interface GroupedService {
  type: string;
  items: string[];
}

const LaundryTable: React.FC<{ data: LaundryItem[] }> = ({ data }) => {
  const groupedData: GroupedService[] = data.reduce((acc, item) => {
    const existingService = acc.find((s) => s.type === item.type);
    if (existingService) {
      if (!existingService.items.includes(item.name)) {
        existingService.items.push(item.name);
      }
    } else {
      acc.push({ type: item.type, items: [item.name] });
    }
    return acc;
  }, [] as GroupedService[]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        {groupedData.map((service, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{service.type}</Text>
            </View>
            <View style={styles.itemsColumn}>
              {service.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.cell}>
                  <Text style={styles.cellText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  itemsColumn: {
    flex: 1,
  },
  cellText: {
    fontSize: 16,
  },
});

export default LaundryTable;
