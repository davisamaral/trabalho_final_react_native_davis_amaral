import React, { FC } from "react";
import { ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import IProduct from "../../Interfaces/IProduct";
import Colors from "../../Styles/Colors";
import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  StyledActivityIndicator
} from "./DetailStyles";

type iProps = {
  dataConnection: IProduct | null;
  isLoading: boolean;
  toggleFavorite: () => void
};

const DetailView: FC<iProps>  = ({dataConnection, isLoading, toggleFavorite}) => {


  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark}
      />
    );
  }
  let favoriteIcon = "star-outline";
  if (dataConnection?.favorite ==  true) {
    favoriteIcon = "star";
  }

  return<MainContainer>
    {loadingBox}
  <ScrollView>
    <TextName>
      {dataConnection?.name}
    </TextName>
    <TextTitle>Preço</TextTitle>
    <TextDetail>
      {dataConnection?.price} 
    </TextDetail>
    <IconButton
    icon={favoriteIcon}
    size={48}
    onPress={() => toggleFavorite()}
  />
  </ScrollView>
</MainContainer>
}

export default DetailView;
