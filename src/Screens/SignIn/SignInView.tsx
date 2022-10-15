import React, { FC, useRef } from "react";
import Colors from "../../Styles/Colors";
import {
  MainContainer,
  ViewInfo,
  KeyboardAvoidingViewContainer,
  ViewContainer,
  FabStyle,
} from "./SignInStyles";
import {
  ScrollView,
  Platform,
} from "react-native";
import { FAB } from "react-native-elements";

import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import CommonForm, { FormCommonRefs, FormListInfo} from "../../Components/CommonForm/CommonForm";
import { FormDataType } from "./SignInController";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";

type IProps = {
  onSubmit: (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => void | Promise<any>;
  signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  >;
};

const SignInView: FC<IProps> = ({
  signInSchema,
  onSubmit,
}) => {
  const commonForm = useRef<FormCommonRefs>(null);

  let formListInfo: FormListInfo[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "Nome",
      icon: "user",
      secure: false,
      type: "name",
    },
    {
      name: "phone",
      label: "Telefone",
      placeholder: "Telefone",
      icon: "phone",
      secure: false,
      type: "phone",
    },
    {
      name: "email",
      label: "E-mail",
      placeholder: "E-mail",
      icon: "envelope",
      secure: false,
      type: "email",
    },
    {
      name: "password",
      label: "Senha",
      placeholder: "Senha",
      icon: "lock",
      secure: true,
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirmar Senha",
      placeholder: "Confirmar Senha",
      icon: "lock",
      secure: true,
      type: "password",
    },
  ];

  let behavior: 'height' | 'position' | 'padding' | undefined;
  if (Platform.OS === "ios") {
    behavior = "padding";
  }

  return (
    <MainContainer>
      <DrawerMenu />
      <KeyboardAvoidingViewContainer behavior={behavior}>
        <ScrollView>
          <ViewContainer>
            <ViewInfo>
              <CommonForm
                ref={commonForm}
                listInfo={formListInfo}
                signInSchema={signInSchema}
                onSubmit={onSubmit}
              />
            </ViewInfo>
          </ViewContainer>
        </ScrollView>
      </KeyboardAvoidingViewContainer>
      <FabStyle>
        <FAB
          loading={false}
          icon={{ name: "add", color: Colors.White }}
          color={Colors.PrimaryDark}
          onPress={() => commonForm.current!.submitForm()}
        />
      </FabStyle>
    </MainContainer>
  );
};

export default SignInView;
