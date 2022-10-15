import React, { FC, useState, useEffect } from "react";
import FavoritesView from "./FavoritesView";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import { useAppSelector } from "../../store/hooks";

type iProps = StackScreenProps<MainStackParamList, "Favorites">;

const FavoritesController: FC<iProps> = ({ route, navigation }) => {
  const userInfo = useAppSelector((state) => state.login.user);
  var token = userInfo?.token || "";
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getFavoriteProductsAPI = useAPI(ProductAPI.getFavoriteProducts);

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  const getFavoriteProducts = () => {
    setIsLoading(true);
    getFavoriteProductsAPI
      .requestPromise(token)
      .then((result: any) => {
        setIsLoading(false);
        console.log("sucesso ao carregar produtos favoritos");
        console.log(result);
        setDataConnection(result.products);
      })
      .catch((error: string) => {
        console.log("deu erro ao carregar produtos favoritos: "+ error);
      });
  };

  const goToDetail = (product: IProduct) => {
    navigation.push("Detail", {
      productId: product._id,
    });
  };

  return (
    <FavoritesView
      navigation={navigation}
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default FavoritesController;
