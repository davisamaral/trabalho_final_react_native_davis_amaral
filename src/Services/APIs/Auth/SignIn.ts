import IUserInfo from "../../../Interfaces/IUser";
import api from "../Common/api";

const doSignIn = (url:string, data:any) => api.put("https://fiap-reactjs-presencial.herokuapp.com/storeProducts/signup", data);
type IParamDoSignIn = {
  name: string,
  phone: string,
  email: string;
  password: string;
};

export { doSignIn, IParamDoSignIn};