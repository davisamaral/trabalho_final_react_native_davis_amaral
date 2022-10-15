import React, { useState, FC } from "react";
import SignInView from "./SignInView";
import { StackScreenProps } from "@react-navigation/stack";
import { LoginStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import IUser from "../../Interfaces/IUser";
import { doSignIn, IParamDoSignIn } from "../../Services/APIs/Auth/SignIn";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/login/LoginSlice";

export type FormDataType = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

type IProps = StackScreenProps<LoginStackParamList, "SignIn">;

const SignInController:FC<IProps> = ({ navigation }) => {

  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [messageErrorConnection, setMessageErrorConnection] = useState("")

    const signInSchema: ObjectSchema<
      ObjectShape,
      AnyObject,
      TypeOfShape<ObjectShape>,
      AssertsShape<ObjectShape>
    > = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório"),
      phone: Yup.string().required("Telefone é obrigatório"),
      email: Yup.string()
        .email("E-mail não válido")
        .required("E-mail é obrigatório"),

      password: Yup.string()
        .required("Senha é obrigatório")
        .min(4, "Senha é curta - deveria ter ao menos 4 caracteres"),
    });

  const doSignInAPI = useAPI(doSignIn);
  const dispatch = useAppDispatch();

  const makeSignIn = (name: string, email: string, password: string, phone: string) => {

    let signInParams: IParamDoSignIn = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };

    setIsLoadingAuth(true);
  
    doSignInAPI
      .requestPromise("", signInParams)
      .then((user: any) => {
        console.log("SignIn com Sucesso. result:");
        console.log(user);
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro ao cadastrar");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };



  const onSubmit = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    console.log(values);
    makeSignIn(
      values.name,
      values.email,
      values.password,
      values.phone,
    )
  };

  return (
    <SignInView       
      signInSchema={signInSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignInController;
