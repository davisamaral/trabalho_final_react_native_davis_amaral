import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Alert } from "react-native";
import {   
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, 
} from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import { registerRootComponent } from "expo";
import Colors from "../Styles/Colors";

import SignInController from "../Screens/SignIn/SignInController";
import LoginController from "../Screens/Login/LoginController";
import ProductsController from "../Screens/Products/ProductsController";
import DetailController from "../Screens/Detail/DetailController";
import FavoritesController from "../Screens/Favorites/FavoritesController";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";
import { cleanUser } from "../store/login/LoginSlice";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Provider } from "react-redux";
import * as Updates from "expo-updates";

export type LoginStackParamList = {
  Login: undefined;
  SignIn: undefined;
};

export type MainStackParamList = {
  Products: undefined;
  Detail: { productId: string };
  Favorites: undefined;
};

const LoginStack = createStackNavigator<LoginStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator();

let screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
  headerLayoutPreset: "center",
};

let loginScreenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
};

export const StackProducts = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Products"
        component={ProductsController}
        options={{ ...screenOptions, title: "Produtos" }}
      />
      <MainStack.Screen
        name="Detail"
        component={DetailController}
        options={{ ...screenOptions, title: "Detalhes do Produto" }}
      />
    </MainStack.Navigator>
  );
};


export function RouteController() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.login.user);
  var isUserLogged = userInfo && userInfo.token !== "";

function doLogout(){
  Alert.alert(
    "Logout",
    "Deseja realmente sair do app?",
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sair", onPress: () => { 
          dispatch(cleanUser()); 
          console.log("Clicou em sair");  
        }
      }
    ]
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView>
      <DrawerItem label={userInfo?.name || "--"} onPress={() => console.log("")} />
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => doLogout() } />
    </DrawerContentScrollView>
  );
}

  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        setHasUpdate(true);
      }
    }
    updateApp();
  }, []);

  if (isUserLogged) {
    return (
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={StackProducts}
            options={{ drawerLabel: "Produtos", headerShown: false }}
          />
          <Drawer.Screen
            name="Favorites"
            component={FavoritesController}
            options={{ ...screenOptions, drawerLabel: "Favoritos" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <LoginStack.Navigator >
          <LoginStack.Screen
            name="Login"
            component={LoginController}
            options={{ headerShown: false }}
          />
          <LoginStack.Screen
            name="SignIn"
            component={SignInController}
            options={{ ...loginScreenOptions }}
          />
        </LoginStack.Navigator>
      </NavigationContainer>
    );
  }
}

const RouteControllerManagement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(RouteControllerManagement);
