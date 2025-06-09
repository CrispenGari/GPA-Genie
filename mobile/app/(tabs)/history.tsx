import { Text, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants";

const Page = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
        paddingBottom: 100,
      }}
      style={{ flex: 1, backgroundColor: COLORS.main }}
    >
      <Text>Page</Text>
    </ScrollView>
  );
};

export default Page;
