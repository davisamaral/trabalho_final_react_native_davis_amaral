
import React, { FC, useState } from "react";
import LoginView from "./LoginView";

import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import { doLogin, IParamDoLogin } from "../../Services/APIs/Auth/Login";
import IUser from "../../Interfaces/IUser";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/login/LoginSlice";

import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { i18n } from "../../Services/Language/ManageStrings";
import { CommonActions } from "@react-navigation/native";

export type FormDataType = {
  email: string;
  password: string;  
};

type iProps = StackScreenProps<LoginStackParamList, "Login">;

const LoginController: FC<iProps> = ({ route, navigation }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [messageErrorConnection, setMessageErrorConnection] = useState("")
  const doLoginAPI = useAPI(doLogin);
  const dispatch = useAppDispatch();
  

  const makeLogin = (userName: string, password: string) => {

    let loginParams: IParamDoLogin = {
      email: userName,
      password: password,
    };
    setIsLoadingAuth(true);

    doLoginAPI
      .requestPromise("", loginParams)
      .then((user: IUser) => {
        if (user.message) {
          setMessageErrorConnection(user.message);
        } else {
          setMessageErrorConnection("Login com Sucesso");
          console.log(user);
          dispatch(setUser({ user }));
        }
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        // var user = {
        //   name: "Davis Logado",
        //   phone: "11 64020110",
        //   token: "kasjuhegfjkhagsefjkhgjkase",
        //   userId: "65asdf4654fasd65",
        //   message: "Uma mensagem marota",
        // } as IUser
        // dispatch(setUser({ user }));
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const goToSignIn = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SignIn'
      })
    );
  };

  const signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  > = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalidEmail"))
      .required(i18n.t("requiredEmail")),

    password: Yup.string()
      .required(i18n.t("requiredPassword"))
      .min(4, i18n.t("shortPassword")),
  });

  const submitForm = async (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    console.log("Fazendo login")
    setIsLoadingAuth(true);
    makeLogin(values.email, values.password);
  };

  return (
    <LoginView
      submitForm={submitForm}
      goToSignIn={goToSignIn}
      isLoadingAuth={isLoadingAuth}
      messageConnection={messageErrorConnection}
      signInSchema={signInSchema}
    />
  );
};

export default LoginController;
