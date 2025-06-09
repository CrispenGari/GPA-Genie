import React from "react";
import * as Network from "expo-network";

export const useNetwork = () => {
  const [state, setState] = React.useState<Network.NetworkState>({
    isConnected: undefined,
    isInternetReachable: undefined,
    type: undefined,
  });
  React.useEffect(() => {
    const subscription = Network.addNetworkStateListener(
      ({ type, isConnected, isInternetReachable }) => {
        setState({ type, isConnected, isInternetReachable });
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return {
    ...state,
  };
};
