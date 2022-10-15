import React, { FC, useState, useEffect } from "react";
import ProductsView from "./ProductsView";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import ProductAPI from "../../Services/APIs/Products/Products";
import IProduct from "../../Interfaces/IProduct";
import { useAppSelector } from "../../store/hooks";

type iProps = StackScreenProps<MainStackParamList, "Products">;

const ProductsController: FC<iProps> = ({ route, navigation }) => {
  const userInfo = useAppSelector((state) => state.login.user);
  var token = userInfo?.token || "";
  const [dataConnection, setDataConnection] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getProductsAPI = useAPI(ProductAPI.getProducts);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    getProductsAPI
      .requestPromise(token)
      .then((result: any) => {
        setIsLoading(false);
        console.log("sucesso ao carregar produtos");
        console.log(result);
        setDataConnection(result.products);
      })
      .catch((error: string) => {
        console.log("deu erro ao carregar produtos: "+ error);
      });
  };

  const goToDetail = (product: IProduct) => {
    navigation.push("Detail", {
      productId: product._id,
    });
  };

  return (
    <ProductsView
      navigation={navigation}
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );
};

export default ProductsController;
