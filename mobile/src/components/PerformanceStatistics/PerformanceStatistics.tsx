import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Animated, { SlideInDown } from "react-native-reanimated";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { COLORS, FONTS } from "@/src/constants";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import { useHistoryStore } from "@/src/store/historyStore";
import { useBarChartNavigation } from "@/src/utils/barData";
const VALUES = ["Weekly", "Monthly", "Yearly"];
const PerformanceStatistics = () => {
  const { settings } = useSettingsStore();
  const [index, setIndex] = React.useState(0);
  const { history } = useHistoryStore();
  const { barData, canGoNext, goNext, goPrevious, rangeLabel } =
    useBarChartNavigation(
      history as any,
      VALUES[index].toLocaleLowerCase() as any
    );

  return (
    <Animated.View
      style={{
        backgroundColor: COLORS.gray100,
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        elevation: 2,
        shadowColor: COLORS.red,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      entering={SlideInDown.duration(200).delay(0)}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          color: COLORS.primary,
        }}
      >
        {VALUES[index]} Performance
      </Text>
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.black,
          marginBottom: 16,
          fontSize: 20,
        }}
      >
        {rangeLabel}
      </Text>
      <View style={{}}>
        <BarChart
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          minHeight={5}
          frontColor={COLORS.gray200}
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          gradientColor={COLORS.red}
          xAxisLabelTextStyle={{
            fontFamily: FONTS.bold,
            color: COLORS.secondary,
          }}
          yAxisTextStyle={{
            fontFamily: FONTS.bold,
            color: COLORS.secondary,
          }}
          yAxisLabelSuffix="%"
        />
      </View>

      <View
        style={{
          gap: 10,
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          hitSlop={20}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            goPrevious();
          }}
        >
          <Ionicons name="chevron-back" size={24} />
          <Text
            style={{ fontFamily: FONTS.bold, color: COLORS.main, fontSize: 14 }}
          >
            Prev
          </Text>
        </TouchableOpacity>
        <SegmentedControl
          style={{ flex: 1 }}
          fontStyle={{
            fontFamily: FONTS.bold,
            color: COLORS.main,
          }}
          values={VALUES}
          selectedIndex={index}
          onChange={async (event) => {
            if (settings.haptics) {
              await onImpact();
            }
            setIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <TouchableOpacity
          disabled={!canGoNext}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            goNext();
          }}
          style={styles.btn}
          hitSlop={20}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.main,
              fontSize: 14,
            }}
          >
            Next
          </Text>
          <Ionicons name="chevron-forward" color={COLORS.main} size={24} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PerformanceStatistics;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    flexDirection: "row",
  },
});
