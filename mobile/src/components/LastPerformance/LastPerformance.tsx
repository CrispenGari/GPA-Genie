import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, COLORS } from "@/src/constants";
import { PieChart } from "react-native-gifted-charts";
import { useHistoryStore } from "@/src/store/historyStore";
import dayjs from "dayjs";
import { useSettingsStore } from "@/src/store/settingsStore";
import { customRelativeTime, onImpact } from "@/src/utils";

const LastPerformance = () => {
  const { last } = useHistoryStore();
  const { settings } = useSettingsStore();
  const pieData = React.useMemo(() => {
    if (!!!last) return [];
    const percentage = (last.cgpa / 4) * 100;
    return [
      { value: percentage, color: COLORS.tertiary },
      { value: 100 - percentage, color: COLORS.red },
    ];
  }, [last]);

  const percentage = React.useMemo(() => {
    if (!!!last) return 0;
    return (last.cgpa / 4) * 100;
  }, [last]);

  if (!!!last)
    return (
      <View
        style={{
          flex: 0.6,
          padding: 10,
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          height: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.tertiary,
            textAlign: "center",
          }}
        >
          No Previous Performance.
        </Text>
      </View>
    );

  return (
    <TouchableOpacity
      style={{
        flex: 0.6,
        padding: 10,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
      }}
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: 14,
          color: COLORS.tertiary,
        }}
      >
        Last Performance
      </Text>
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: 20,
          color: COLORS.white,
        }}
        numberOfLines={1}
      >
        {customRelativeTime(dayjs(new Date(last?.date)))}
      </Text>
      <View style={{ alignSelf: "center", marginVertical: 10 }}>
        <PieChart
          donut
          isAnimated
          animationDuration={300}
          innerRadius={40}
          data={pieData}
          radius={60}
          centerLabelComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: FONTS.bold }}>
                  {percentage.toFixed(0)}%
                </Text>
                <Text style={{ fontFamily: FONTS.regular }}>
                  {last?.description}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LastPerformance;
