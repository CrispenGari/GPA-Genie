import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";
import * as Updates from "expo-updates";
import * as Constants from "expo-constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const sendPushNotification = async (token: string) => {
  const message = {
    to: token,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const rateApp = async () => {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
    }
  }
};
export const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    Alert.alert(
      Constants.default.name,
      error as any,
      [{ text: "OK", style: "destructive" }],
      { cancelable: false }
    );
  }
};

export const onImpact = async () =>
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const calculateAge = (birthDateInput?: Date | string | number) => {
  const birthDate = new Date(birthDateInput ?? "");
  if (isNaN(birthDate.getTime())) {
    return 0;
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate?.getFullYear();
  const m = today.getMonth() - birthDate?.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate?.getDate())) age--;
  return age;
};

export const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning 🌞";
  } else if (hour < 18) {
    return "Good afternoon 🌤️";
  } else {
    return "Good evening 🌙";
  }
};

export function customRelativeTime(date: dayjs.ConfigType): string {
  const d = dayjs(date);
  const now = dayjs();
  if (d.isToday()) return "Today";
  if (d.isYesterday()) return "Yesterday";
  const daysDiff = now.diff(d, "day");
  const weeksDiff = now.diff(d, "week");
  const monthsDiff = now.diff(d, "month");
  const yearsDiff = now.diff(d, "year");
  if (daysDiff < 7) return `${daysDiff} Days ago`;
  if (weeksDiff < 4)
    return weeksDiff === 1 ? "1 Week ago" : `${weeksDiff} Weeks ago`;
  if (monthsDiff < 12)
    return monthsDiff === 1 ? "1 Month ago" : `${monthsDiff} Months ago`;
  return yearsDiff === 1 ? "1 Year ago" : `${yearsDiff} Years ago`;
}
