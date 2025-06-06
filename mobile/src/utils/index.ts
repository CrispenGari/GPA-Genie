import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";
import * as Updates from "expo-updates";
import * as Constants from "expo-constants";

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
