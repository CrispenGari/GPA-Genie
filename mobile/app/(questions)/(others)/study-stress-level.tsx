import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import Form from "@/src/components/Form/Form";
import { COLORS, FONTS } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Dropdown from "react-native-input-select";
import { calculateAge, onImpact } from "@/src/utils";
import { useSettingsStore } from "@/src/store/settingsStore";
import { useMutation } from "@tanstack/react-query";
import { predictCGPA } from "@/src/utils/react-query";
import { useMeStore } from "@/src/store/meStore";
import Spinner from "react-native-loading-spinner-overlay";
import { THealth } from "@/src/types";
import { useHistoryStore } from "@/src/store/historyStore";

const Page = () => {
  const [state, setState] = React.useState<{
    value: number;
  }>({
    value: 1,
  });
  const { me } = useMeStore();
  const { settings } = useSettingsStore();
  const { health, academicEngagement, sleepQuality, studyHours } =
    useLocalSearchParams<{
      health: string;
      academicEngagement: string;
      sleepQuality: string;
      studyHours: string;
    }>();

  const { add } = useHistoryStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: predictCGPA,
    mutationKey: ["gpa"],
    networkMode: "offlineFirst",
  });
  const router = useRouter();
  const performAnalysis = async () => {
    if (!!!me || !!!me.gender || !!!me.year) return;
    const _health: THealth = JSON.parse(health);
    const body = {
      academicEngagement: Number.parseInt(academicEngagement),
      age: calculateAge(me.dob),
      anxiety: Boolean(_health.anxiety),
      depression: Boolean(_health.anxiety),
      gender: me.gender,
      year: me.year,
      mentalHealthSupport: Boolean(_health.mentalHealthSupport),
      panicAttack: Boolean(_health.panicAttacks),
      sleepQuality: Number.parseInt(sleepQuality),
      specialistTreatment: Boolean(_health.specialistTreatment),
      studyHoursPerWeek: Number.parseInt(studyHours),
      studyStressLevel: state.value,
      symptomFrequencyLast7Days: _health.symptomsFrequency,
    };
    const data = await mutateAsync({
      body,
    });
    if (data.status === "error") {
      return Alert.alert(
        "GPA Ginie",
        data.message || "Something went wrong try again.",
        [
          {
            text: "OK",
            onPress: async () => {
              if (settings.haptics) {
                await onImpact();
              }
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    if (!!data.prediction) {
      add({
        ...data.prediction,
        date: new Date(),
      });
      router.replace({
        pathname: "/(tabs)",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <Spinner visible={isPending} animation="fade" />
        <View
          style={{
            flex: 0.4,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="headphones" size={40} color={COLORS.white} />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.white,
              textAlign: "center",
            }}
          >
            Other Information
          </Text>
        </View>
        <View
          style={{ flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" }}
        >
          <Form
            question="What is your current stress level?"
            onNext={performAnalysis}
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
                  { value: 1, label: "Very Low" },
                  { value: 2, label: "Low" },
                  { value: 3, label: "Moderate" },
                  { value: 4, label: "High" },
                  { value: 5, label: "Very High" },
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
