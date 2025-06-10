import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import TypeWriter from "react-native-typewriter";
import { COLORS, FONTS } from "@/src/constants";
import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";

interface Props {
  onNext: () => void;
  onPrevious?: () => void;
  question: string;
  children: React.ReactNode;
  showButtons?: boolean;
}
const Form = ({
  question,
  onNext,
  onPrevious,
  children,
  showButtons = true,
}: Props) => {
  const { settings } = useSettingsStore();
  return (
    <Animated.View
      style={{
        padding: 10,
      }}
    >
      <TypeWriter
        style={[
          {
            fontFamily: FONTS.bold,
            fontSize: showButtons ? 25 : 16,
            color: COLORS.white,
          },
        ]}
        typing={1}
        maxDelay={-50}
      >
        {question}
      </TypeWriter>
      {children}

      {showButtons ? (
        <View style={{ flexDirection: "row", gap: 20, marginVertical: 20 }}>
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              if (typeof onPrevious === "undefined") return;
              onPrevious();
            }}
            style={[styles.btn]}
            disabled={typeof onPrevious === "undefined"}
          >
            <Text style={[styles.btn_text, { color: COLORS.black }]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: COLORS.primary }]}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              onNext();
            }}
          >
            <Text style={[styles.btn_text]}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default Form;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  btn_text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
