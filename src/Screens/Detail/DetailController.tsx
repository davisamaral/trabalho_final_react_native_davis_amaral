import React, { FC, useState, useEffect } from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import { useAppSelector } from "../../store/hooks";

type iProps = StackScreenProps<MainStackParamList, "Detail">;

const DetailController:FC<iProps> = ({ navigation, route }) => {
  const userInfo = useAppSelector((state) => state.login.user);
  var token = userInfo?.token || "";
  const [dataConnection, setDataConnection] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getProductAPI = useAPI(ProductAPI.getProduct);
  const toggleFavoriteAPI = useAPI(ProductAPI.manageFavoriteProduct);

    const { productId } = route.params;
    
    useEffect(() => {
      getProduct();
    }, []);

    const getProduct = () => {
      setIsLoading(true);
      getProductAPI
        .requestPromise(token, productId)
        .then((result: any) => {
          setIsLoading(false);
          setDataConnection(result.product);
        })
        .catch((error:string) => {
          console.log("Erro ao carregar produto: "+error);
        });
    };

    const toggleFavorite = () => {
      toggleFavoriteAPI
        .requestPromise(token, {productID: productId})
        .then((result: any) => {
          getProduct();
        })
        .catch((error:string) => {
          console.log("Erro ao favoritar produto: "+error);
        });
    };

  return <DetailView dataConnection={dataConnection} isLoading={isLoading} toggleFavorite={toggleFavorite}/>;
};

export default DetailController;
