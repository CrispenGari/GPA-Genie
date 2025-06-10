import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import React from "react";
import { Platform, TouchableOpacity, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface BirthdayPickerProps {
  onChange: (date: Date) => void;
  initialDate?: Date;
}

const BirthdayPicker: React.FC<BirthdayPickerProps> = ({
  onChange,
  initialDate,
}) => {
  const [date, setDate] = React.useState(initialDate || new Date(1999, 9, 5));
  const [showPicker, setShowPicker] = React.useState(false);
  const { settings } = useSettingsStore();
  const bd = React.useMemo(() => {
    const month = date ? String(date.getMonth() + 1).padStart(2, "0") : "";
    const day = date ? String(date.getDate()).padStart(2, "0") : "";
    const year = date ? String(date.getFullYear()) : "";
    return [
      {
        value: day,
        label: "DD",
      },
      {
        value: month,
        label: "MM",
      },
      {
        value: year,
        label: "YYYY",
      },
    ];
  }, [date]);
  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          setShowPicker(true);
        }}
      >
        {bd.map((item) => (
          <View style={{ alignItems: "center" }} key={item.label}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                height: 40,
                width: item.label === "YYYY" ? 100 : 80,
                borderRadius: 5,
                borderColor: COLORS.tertiary,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                {item.value}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.white,
                fontSize: 10,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.select({ ios: "spinner", default: "default" })}
          maximumDate={new Date()}
          onChange={handleChange}
          minimumDate={new Date(1990, 0, 1)}
        />
      )}
    </>
  );
};
export default BirthdayPicker;
