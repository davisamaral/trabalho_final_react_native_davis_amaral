import styled from "styled-components/native";
import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";
import Colors from '../../Styles/Colors';

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TopScreen = styled.View`
  flex: 3;
  align-content: center;
  justify-content: center;
`;

export const BottomScreen = styled.View`
  flex: 4;
  flex-direction: column;
  justify-content: center;
`;

export const FrontImageBackground = styled.View`
  flex: 1;
  padding-top: 40px;
  padding-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const LogoDiv = styled.Text`
  margin: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

export const LoginBox = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  margin: 35px;
  border-radius: 7px;
  border-width: 1px;
  border-color: gray;
  padding: 20px;
`;

export const SignInBox = styled.TouchableHighlight`
  background-color: rgba(5, 5, 5, 0.4);
  margin-left: 35px;
  margin-right: 35px;
  border-radius: 7px;
  border-width: 1px;
  border-color: gray;
  padding: 12px;
`;

export const SignInButtonLabel = styled.Text`
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  color: ${Colors.PrimaryDark};
`;

export const LabelLogin = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #333;
`;

export const BottomButton = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
`;
export const MessageErrorBox = styled.View`

`;
export const MessageError = styled.Text`
    font-size: 13px;
    text-align: center;
    font-weight: bold;
    color: red;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: "red",
    borderRadius: 7,
  },
})``;

export const StyledImageBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
`;
