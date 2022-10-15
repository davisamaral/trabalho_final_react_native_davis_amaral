import React, {FC} from "react";
import {
  FlatList,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/RouteController";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";

import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
} from "./ProductsStyles";

type iProps = {
  navigation: StackNavigationProp<MainStackParamList, "Products">;
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const ProductsView:FC<iProps> = ({ dataConnection, isLoading, goToDetail }) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    return (
      <ContainerItem onPress={() => goToDetail(item)}>
        <>
        <TextsView>
          <View>
            <TextNameStyle>
              <TextTitle>
                {item.name}
              </TextTitle>
            </TextNameStyle>
            <TextNameStyle>
              <TextDetail>
                {item.price}
              </TextDetail>
            </TextNameStyle>
          </View>
        </TextsView>
        <Separator />
        </>
    </ContainerItem>
  );
};

  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark} 
      />
    );
  }
  return (
    <MainSafeAreaView>
      <DrawerMenu />
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IProduct }) => <RenderItem item={item} />}
        keyExtractor={(item: IProduct) => item._id.toString()}
      />
    </MainSafeAreaView>
  );
};

export default ProductsView;
