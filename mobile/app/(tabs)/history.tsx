import { Text, TouchableOpacity, View, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TPerformance } from "@/src/types";
import { useHistoryStore } from "@/src/store/historyStore";
import GPABottomSheet from "@/src/components/BottomSheets/GPABottomSheet";
import { onImpact, customRelativeTime } from "@/src/utils";
import dayjs from "dayjs";
import { PieChart } from "react-native-gifted-charts";

const Page = () => {
  const { history } = useHistoryStore();
  if (history.length === 0) {
    return (
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            textAlign: "center",
            color: COLORS.white,
          }}
        >
          Nothing to show.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 10,
        paddingBottom: 100,
        gap: 5,
      }}
      style={{ flex: 1, backgroundColor: COLORS.main }}
      keyExtractor={(item) => item.id}
      data={history}
      renderItem={({ item }) => <HistoryItem history={item} />}
    />
  );
};

export default Page;

const HistoryItem = ({ history }: { history: TPerformance }) => {
  const { settings } = useSettingsStore();
  const gpaBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const pieData = React.useMemo(() => {
    if (!!!history) return [];
    const percentage = (history.cgpa / 4) * 100;
    return [
      { value: percentage, color: COLORS.tertiary },
      { value: 100 - percentage, color: COLORS.red },
    ];
  }, [history]);

  const percentage = React.useMemo(() => {
    if (!!!history) return 0;
    return (history.cgpa / 4) * 100;
  }, [history]);
  return (
    <>
      <GPABottomSheet history={history} ref={gpaBottomSheetRef} />
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
          gpaBottomSheetRef.current?.present();
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
          {customRelativeTime(dayjs(new Date(history.date)))}
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
                  <Text
                    style={{ fontFamily: FONTS.regular, textAlign: "center" }}
                  >
                    {history.description}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};
