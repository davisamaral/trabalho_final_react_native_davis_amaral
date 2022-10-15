import React, { useRef } from "react";

import Colors from "../../Styles/Colors";
import { ActivityIndicator} from "react-native";
import {
  BottomScreen,
  FrontImageBackground,
  LoginBox,
  SignInBox,
  SignInButtonLabel,
  LogoDiv,
  MainContainer,
  StyledButton,
  StyledImageBackground,
  TopScreen,
  MessageErrorBox,
  MessageError,
} from "./LoginStyles";
import { FormDataType } from "./LoginController";
import { FormikHelpers } from "formik";
import CommonForm, {
  FormCommonRefs,
  FormListInfo,
} from "../../Components/CommonForm/CommonForm";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { i18n } from "../../Services/Language/ManageStrings";

type IProps = {
  isLoadingAuth: boolean;
  goToSignIn: () => void;
  messageConnection: string;
  submitForm: (
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
const LoginView = ({
  isLoadingAuth,
  goToSignIn,
  submitForm,
  messageConnection,
  signInSchema,
}: IProps) => {

  const commonForm = useRef<FormCommonRefs>(null);
  let buttonBox = null;
  let messageError = null;

  console.log(isLoadingAuth);
  if (isLoadingAuth) {
    buttonBox = <ActivityIndicator color={Colors.PrimaryDark} />;
  } else {
    buttonBox = (
      <StyledButton
        title={i18n.t("login")}
        testID="loginButton"
        onPress={() => commonForm.current!.submitForm()}
      />
    );
    if (messageConnection !== "") {
      messageError = (
        <MessageErrorBox >
          <MessageError>{messageConnection}</MessageError>
        </MessageErrorBox>
      );
    }
  }

  let formListInfo: FormListInfo[] = [
    {
      name: "email",
      label: i18n.t("email"),
      placeholder: i18n.t("email"),
      icon: "envelope",
      secure: false,
      type: "email",
    },
    {
      name: "password",
      label: i18n.t("password"),
      placeholder: i18n.t("password"),
      icon: "lock",
      secure: true,
      type: "password",
    },
  ];

  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://ssxdigital.com.br/wp-content/uploads/2020/03/compra-online.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <TopScreen>
            <LogoDiv>Davis Amaral</LogoDiv>
          </TopScreen>
          <BottomScreen>
            <LoginBox>
              <CommonForm
                ref={commonForm}
                listInfo={formListInfo}
                signInSchema={signInSchema}
                onSubmit={submitForm}
                hideBottomSpace={true}
              />
              {buttonBox}
              {messageError}
            </LoginBox>
            <SignInBox onPress={() => goToSignIn()}> 
                  <SignInButtonLabel>Fazer Cadastro</SignInButtonLabel>
            </SignInBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default LoginView;
