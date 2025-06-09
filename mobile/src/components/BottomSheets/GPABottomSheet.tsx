import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLORS, FONTS } from "@/src/constants";
import { TPerformance } from "@/src/types";
import { PieChart } from "react-native-gifted-charts";
import { customRelativeTime, onImpact } from "@/src/utils";
import dayjs from "dayjs";
import Animated from "react-native-reanimated";
import Card from "../Card/Card";
import { useSettingsStore } from "@/src/store/settingsStore";
import { useHistoryStore } from "@/src/store/historyStore";

const GPABottomSheet = React.forwardRef<
  BottomSheetModal,
  {
    history: TPerformance;
  }
>(({ history }, ref) => {
  const snapPoints = React.useMemo(() => ["80%"], []);
  const { settings } = useSettingsStore();
  const { dismiss } = useBottomSheetModal();
  const { remove } = useHistoryStore();

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
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: COLORS.main }}
      handleIndicatorStyle={{
        backgroundColor: COLORS.tertiary,
      }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: 10,
          paddingBottom: 25,
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
        <View
          style={{ alignSelf: "center", marginVertical: 10, marginTop: 50 }}
        >
          <PieChart
            donut
            isAnimated
            animationDuration={300}
            innerRadius={120}
            data={pieData}
            radius={150}
            centerLabelComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 40, fontFamily: FONTS.bold }}>
                    {percentage.toFixed(0)}%
                  </Text>
                  <Text style={{ fontFamily: FONTS.regular }}>
                    {history?.description}
                  </Text>

                  <Text style={{ fontSize: 20, fontFamily: FONTS.bold }}>
                    {history.grade_equivalent}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <Animated.View style={{ marginVertical: 20 }}>
          <Card
            style={{
              width: "100%",
              gap: 5,
              alignSelf: "center",
              padding: 20,
              paddingTop: 35,
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: COLORS.gray100,
                top: -10,
                width: 180,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                shadowOpacity: 0.5,
                elevation: 2,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 5,
                shadowColor: COLORS.tertiary,
                alignSelf: "center",
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONTS.bold,
                  fontSize: 16,
                }}
              >
                Summary
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
              }}
            >
              Percentage Range:{" "}
              <Text style={{ fontFamily: FONTS.regular }}>
                {history.percentage_range}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
              }}
            >
              Grade Equivalence:{" "}
              <Text style={{ fontFamily: FONTS.regular }}>
                {history.grade_equivalent}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
              }}
            >
              Description:{" "}
              <Text style={{ fontFamily: FONTS.regular }}>
                {history.description}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
              }}
            >
              CGPA Range:{" "}
              <Text style={{ fontFamily: FONTS.regular }}>{history.range}</Text>
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
              }}
            >
              CGPA Output:{" "}
              <Text style={{ fontFamily: FONTS.regular }}>
                {history.cgpa.toFixed(2)}
              </Text>
            </Text>
          </Card>
        </Animated.View>

        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 5,
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.red,
            maxWidth: 400,
            marginBottom: 100,
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            remove(history.id);
            dismiss();
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.white,
              fontSize: 18,
            }}
          >
            Remove from History
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default GPABottomSheet;
