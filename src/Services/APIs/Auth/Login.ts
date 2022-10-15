import IUserInfo from "../../../Interfaces/IUser";
import api from "../Common/api";

const doLogin = (url:string, data:any) => api.post("https://fiap-reactjs-presencial.herokuapp.com/storeProducts/login", data);
type IParamDoLogin = {
  email: string;
  password: string;
};

export { doLogin, IParamDoLogin};