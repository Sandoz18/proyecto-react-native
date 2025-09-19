import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { Provider,} from "react-redux";
import { store } from "./src/store";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Raleway-Black": require("./assets/fonts/Raleway-Black.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>      
      <MainNavigator />
      <StatusBar style="light" />          
    </Provider>
  );
}