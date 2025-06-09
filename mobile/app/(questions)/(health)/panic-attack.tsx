import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Dropdown from "react-native-input-select";
import { onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";

const Page = () => {
  const [state, setState] = React.useState<{
    value: number;
  }>({
    value: 0,
  });
  const { settings } = useSettingsStore();
  const { anxiety, depression, mentalHealthSupport } = useLocalSearchParams<{
    anxiety: string;
    depression: string;
    mentalHealthSupport: string;
  }>();
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View
          style={{
            flex: 0.4,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="health-and-safety"
            size={40}
            color={COLORS.white}
          />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
              textAlign: "center",
            }}
          >
            Health Information
          </Text>
        </View>
        <View
          style={{ flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" }}
        >
          <Form
            question="Do you sometimes have panic attacks?"
            onNext={() => {
              router.navigate({
                pathname: "/(questions)/(health)/specialist-treatment",
                params: {
                  anxiety,
                  panicAttacks: state.value,
                  depression,
                  mentalHealthSupport,
                },
              });
            }}
            onPrevious={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
          >
            <View style={{ marginVertical: 20 }}>
              <Dropdown
                placeholder="Select Value"
                options={[
                  { value: 0, label: "No" },
                  { value: 1, label: "Yes" },
                ]}
                optionValue={"value"}
                selectedValue={state.value}
                isMultiple={false}
                dropdownIconStyle={{ top: 15, right: 15 }}
                modalControls={{
                  modalOptionsContainerStyle: {
                    backgroundColor: COLORS.white,
                  },
                }}
                dropdownStyle={{
                  borderWidth: 0,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  minHeight: 40,
                  backgroundColor: COLORS.gray100,
                  flexDirection: "column-reverse",
                }}
                placeholderStyle={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontFamily: FONTS.regular,
                }}
                onValueChange={async (value: any) => {
                  if (settings.haptics) await onImpact();
                  setState((state) => ({ ...state, value: value }));
                }}
                primaryColor={COLORS.secondary}
                dropdownHelperTextStyle={{
                  display: "none",
                }}
                selectedItemStyle={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontFamily: FONTS.regular,
                  paddingBottom: 5,
                }}
                listComponentStyles={{
                  itemSeparatorStyle: { borderColor: COLORS.gray100 },
                }}
                checkboxControls={{
                  checkboxLabelStyle: {
                    fontFamily: FONTS.bold,
                    paddingBottom: 5,
                    color: COLORS.black,
                    fontSize: 14,
                  },
                  checkboxStyle: {
                    borderRadius: 999,
                    borderColor: COLORS.transparent,
                  },
                }}
              />
            </View>
          </Form>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;
